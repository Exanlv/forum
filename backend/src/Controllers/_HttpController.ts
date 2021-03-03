import { Application } from "../Classes/Application";

export class HttpController {
    protected application: Application;

    constructor() {
        this.application = Application.getInstance();
    }
}