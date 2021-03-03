import { EventEmitter } from "events";
import * as mongoose from 'mongoose';
import { User } from "./Types/Models/User";

export class Db extends EventEmitter {
    private static _instance: Db = new Db();

    public mongoose;

    public models: {
        user: User
    };

    private constructor() {
        super();

        Db._instance = this;

        this.mongoose = mongoose;

        this.mongoose.connect('mongodb://localhost/forum', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }).then(() => {
            this.emit('mongoDbConnected');
        })
    }

    public static getInstance() {
        return Db._instance;
    }
}