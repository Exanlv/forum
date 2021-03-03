import { ERRORS } from "../Errors";
import { UserInputError } from "./UserInputError";

export class ValueAlreadyInUseError extends UserInputError {
    public statusCode: number = 409;
    public message: string = ERRORS.USER_INPUT.VALUE_ALREADY_IN_USE;
}