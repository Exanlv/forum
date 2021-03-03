import { Application } from "./Classes/Application";
import { Db } from "./Classes/Db";
import { StatusController } from "./Controllers/StatusController";
import { UserController } from "./Controllers/UserController";

Db.getInstance().on('mongoDbConnected', async () => {
    const app = Application.getInstance();

    app.registerModels();

    new StatusController();
    new UserController();

    app.start();
});