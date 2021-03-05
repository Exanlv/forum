import { ERRORS } from "../Errors";
import { UserInputError } from "./UserInputError";

export class UserAlreadyExistsError extends UserInputError {
    public statusCode: number = 404;
    public message: string = ERRORS.USER_INPUT.USER_ALREADY_EXISTS;

    constructor(field: string, value: string) {
        super((() => {
            const incorrectField = {};
            incorrectField[field] = value;
            return incorrectField;
        })());
    }
}