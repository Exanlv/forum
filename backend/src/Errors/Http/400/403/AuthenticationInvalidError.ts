import { ERRORS } from "../../Errors";
import { AuthenticationError } from "./AuthenticationError";

export class AuthenticationInvalidError extends AuthenticationError {
    public message: string = ERRORS.AUTHENTICATION.AUTHENTICATION_INVALID;
}