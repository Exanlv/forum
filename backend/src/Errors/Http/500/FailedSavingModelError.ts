import { model } from "mongoose";
import { ERRORS } from "../Errors";
import { ServerError } from "./ServerError";

export class FailedSavingModelError extends ServerError {
    public message: string = ERRORS.SERVER_ERROR.FAILED_SAVING_MODEL;
    public internalError: string;

    public modelType: string;
    public properties: object;
    
    constructor(error: string, modelType: string, properties: object) {
        super(error);

        this.modelType = modelType;
        this.properties = properties;
    }
}