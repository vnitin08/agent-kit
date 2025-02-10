import { WardenAction } from "./warden_action";
import { createPublicClient, http, createWalletClient, Account, formatUnits, parseUnits } from "viem";
import { z } from "zod";
import { primaryChain } from "../../utils/chains";
import { KNOWN_CONTRACTS } from "../../utils/contracts/constants/known";
import wardenPrecompileAbi from "../../utils/contracts/abi/wardenPrecompileAbi";

const wardenContract = KNOWN_CONTRACTS[primaryChain.id]?.WARDEN;

if (!wardenContract?.address) {
    throw new Error("Warden contract address not found");
}

const CREATE_ORDER_PROMPT = `This tool should be called when a user wants to create a new order.`;

/**
 * Input schema for create order action.
 */
export const CreateOrderInput = z.object({
    tokenIn: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid token address"),
    tokenOut: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid token address"),
    amountIn: z.string().refine(val => !isNaN(parseFloat(val))), 
    price: z.string().refine(val => !isNaN(parseFloat(val))),
    expiration: z.number().int().positive()
});

/**
 * Creates a new order in the marketplace.
 *
 * @param account - The account creating the order.
 * @param args - The input arguments for the action.
 * @returns A message containing the order creation status.
 */
export async function createOrder(
    account: Account,
    args: z.infer<typeof CreateOrderInput>
): Promise<string> {
    try {
        // Setup clients
        const publicClient = createPublicClient({
            chain: primaryChain,
            transport: http()
        });

        const walletClient = createWalletClient({
            account,
            chain: primaryChain,
            transport: http()
        });

        // Prepare order parameters
        const amountInWei = parseUnits(args.amountIn, 18); 
        const [priceNumerator, priceDenominator] = args.price.split(':').map(Number);

        // Prepare contract write parameters
        const { request } = await publicClient.simulateContract({
            address: wardenContract.address,
            abi: wardenPrecompileAbi,
            functionName: 'createOrder',
            args: [
                args.tokenIn,
                args.tokenOut,
                amountInWei,
                priceNumerator,
                priceDenominator,
                args.expiration
            ],
            account
        });

        // Execute transaction
        const txHash = await walletClient.writeContract(request);
        const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });

        if (receipt.status === 'success') {
            return `Order created successfully! TX Hash: ${txHash}`;
        } else {
            return `Order creation failed. TX Hash: ${txHash}`;
        }
    } catch (error) {
        console.error('Order creation error:', error);
        let errorMessage = 'Failed to create order';
        if (error instanceof Error) {
            errorMessage += `: ${error.message}`;
        }
        return errorMessage;
    }
}

/**
 * Create order action.
 */
export class CreateOrderAction
    implements WardenAction<typeof CreateOrderInput>
{
    public name = "create_order";
    public description = CREATE_ORDER_PROMPT;
    public schema = CreateOrderInput;
    public function = createOrder;
}
