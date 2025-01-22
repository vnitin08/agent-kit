import { WardenAction, WardenActionSchemaAny } from "./warden_action";
import { GetSpacesAction } from "./get_spaces";
import { CreateSpaceAction } from "./create_space";
import { GetKeysAction } from "./get_keys";
import { CreateKeyAction } from "./create_key";
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
    ];
}

export const WARDEN_ACTIONS = getAllWardenActions();

export { WardenAction, WardenActionSchemaAny, GetSpacesAction };
