import { WardenAction, WardenActionSchemaAny } from "./warden_action";
import { GetSpacesAction } from "./get_spaces";
import { CreateSpaceAction } from "./create_space";
import { GetKeysAction } from "./get_keys";
import { CreateKeyAction } from "./create_key";
import { GetKeychainsAction } from "./get_keychains";
import { GetBalanceAction } from "./get_balance";
import { RequestFundsAction } from "./request_funds";
/**
 * Retrieves all Warden action instances.
 *
 * @returns - Array of Warden action instances
 */
export function getAllWardenActions(): WardenAction<WardenActionSchemaAny>[] {
    return [
        new GetSpacesAction(),
        new CreateSpaceAction(),
        new GetKeysAction(),
        new CreateKeyAction(),
        new GetKeychainsAction(),
        new GetBalanceAction(),
        new RequestFundsAction(),
    ];
}

export const WARDEN_ACTIONS = getAllWardenActions();

export { WardenAction, WardenActionSchemaAny, GetSpacesAction };
