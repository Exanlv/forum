import { FastifyReply, FastifyRequest } from "fastify";
import { ServerResponse } from "http";
import { Db } from "../Classes/Db";
import { Session } from "../Classes/Types/Models/Session";
import { ResponseTypes } from "../Enums/ResponseTypes";
import { ValueAlreadyInUseError } from "../Errors/Http/400/ValueAlreadtInUseError";
import { FailedSavingModelError } from "../Errors/Http/500/FailedSavingModelError";
import { HttpController } from "./_HttpController";

export class UserController extends HttpController {
    constructor() {
        super();

        this.application.server.post('/user/register', this.register);
    }

    private async register(request: FastifyRequest, reply: FastifyReply<ServerResponse>) {
        const db = Db.getInstance();

        if ((await db.models.user.find({email: request.body.email})).length) {
            throw new ValueAlreadyInUseError(['email']);
        }

        if ((await db.models.user.find({username: request.body.username})).length) {
            throw new ValueAlreadyInUseError(['username']);
        }

        const user = new db.models.user({
            username: request.body.username,
            email: request.body.email,
            password: request.body.password,
        });

        reply.type(ResponseTypes.JSON);

        const session = new Session(user);

        user.sessions.push(session);

        try {
            await user.save();
        } catch (e) {
            throw new FailedSavingModelError(e, 'User', user);
        }

        return user;
    }
}