import { WardenAction, WardenActionSchemaAny } from "./warden_action";
import { GetSpacesAction } from "./get_spaces";

/**
 * Retrieves all Warden action instances.
 *
 * @returns - Array of Warden action instances
 */
export function getAllWardenActions(): WardenAction<WardenActionSchemaAny>[] {
    return [new GetSpacesAction()];
}

export const WARDEN_ACTIONS = getAllWardenActions();

export { WardenAction, WardenActionSchemaAny, GetSpacesAction };
