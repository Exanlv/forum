import { ERRORS } from "../../Errors";

export class AuthenticationError extends Error {
    public statusCode: number = 403;
    public message: string = ERRORS.AUTHENTICATION.AUTHENTICATION_REQUIRED;
}