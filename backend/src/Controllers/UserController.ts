import { FastifyReply, FastifyRequest } from "fastify";
import { ServerResponse } from "http";
import { Db } from "../Classes/Db";
import { ResponseTypes } from "../Enums/ResponseTypes";
import { ValueAlreadyInUseError } from "../Errors/Http/400/ValueAlreadtInUseError";
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

        await (user as any).save();

        return user;
    }
}