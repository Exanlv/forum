import { ERRORS } from "../Errors";

export class ServerError extends Error {
    public statusCode: number = 500;
    public message: string = ERRORS.SERVER_ERROR.GENERIC;
    public internalError: string = 'No further information';

    constructor(error: string) {
        super();

        this.internalError = error;
    }
}