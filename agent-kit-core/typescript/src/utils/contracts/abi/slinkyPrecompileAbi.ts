const json = {
    data: {
        bytecode: {
            functionDebugData: {},
            generatedSources: [],
            linkReferences: {},
            object: "",
            opcodes: "",
            sourceMap: "",
        },
        deployedBytecode: {
            functionDebugData: {},
            generatedSources: [],
            immutableReferences: {},
            linkReferences: {},
            object: "",
            opcodes: "",
            sourceMap: "",
        },
        gasEstimates: null,
        methodIdentifiers: {
            "getPrice(string,string)": "3d0f34da",
        },
    },
    abi: [
        {
            inputs: [
                {
                    internalType: "string",
                    name: "base",
                    type: "string",
                },
                {
                    internalType: "string",
                    name: "quote",
                    type: "string",
                },
            ],
            name: "getPrice",
            outputs: [
                {
                    components: [
                        {
                            internalType: "uint64",
                            name: "id",
                            type: "uint64",
                        },
                        {
                            internalType: "uint64",
                            name: "nonce",
                            type: "uint64",
                        },
                        {
                            internalType: "uint64",
                            name: "decimals",
                            type: "uint64",
                        },
                        {
                            components: [
                                {
                                    internalType: "uint64",
                                    name: "blockHeight",
                                    type: "uint64",
                                },
                                {
                                    internalType: "uint256",
                                    name: "blockTimestamp",
                                    type: "uint256",
                                },
                                {
                                    internalType: "uint256",
                                    name: "price",
                                    type: "uint256",
                                },
                            ],
                            internalType: "struct QuotePrice",
                            name: "price",
                            type: "tuple",
                        },
                    ],
                    internalType: "struct GetPriceResponse",
                    name: "response",
                    type: "tuple",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
    ],
} as const;

export default json.abi;
