import { ERRORS } from "../../Errors";

export class UserInputError extends Error {
    public statusCode: number = 400;
    public message: string = ERRORS.USER_INPUT.GENERIC;
    public fields: {[field: string]: any};

    constructor(fields?: {[field: string]: any}) {
        super();

        this.fields = fields;
    }
}