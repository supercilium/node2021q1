import {
  ContainerTypes,
  // Extend from this to define a valid schema type/interface
  ValidatedRequestSchema,
} from "express-joi-validation";
import { UserInterface, GroupCreatingInterface } from "../types";

export interface UserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: UserInterface;
}

export interface GroupRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: GroupCreatingInterface;
}
