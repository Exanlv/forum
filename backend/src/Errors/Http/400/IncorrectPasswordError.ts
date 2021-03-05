import { ERRORS } from "../Errors";
import { UserInputError } from "./UserInputError";

export class IncorrectPasswordError extends UserInputError {
    public statusCode = 403;
    public message = ERRORS.USER_INPUT.INCORRECT_PASSWORD;
}