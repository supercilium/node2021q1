import {
    ContainerTypes,
    // Extend from this to define a valid schema type/interface
    ValidatedRequestSchema,
} from "express-joi-validation";
import { UserInterface } from "types/user";

export interface UserRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: UserInterface;
}
