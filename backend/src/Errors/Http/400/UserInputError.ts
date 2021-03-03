import { ERRORS } from "../Errors";

export class UserInputError extends Error {
    public statusCode: number = 400;
    public message: string = ERRORS.USER_INPUT.GENERIC;
    public fields: Array<string> = [];

    constructor(fields: Array<string>) {
        super();

        this.fields = fields;
    }
}