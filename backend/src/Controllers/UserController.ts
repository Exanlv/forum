import { FastifyReply, FastifyRequest } from "fastify";
import { ServerResponse } from "http";
import { Db } from "../Classes/Db";
import { Session } from "../Classes/Types/Models/Session";
import { User } from "../Classes/Types/Models/User";
import { ResponseTypes } from "../Enums/ResponseTypes";
import { IncorrectPasswordError } from "../Errors/Http/400/403/IncorrectPasswordError";
import { UserAlreadyExistsError } from "../Errors/Http/400/400/UserAlreadyExistsError";
import { UserNotFoundError } from "../Errors/Http/400/404/UserNotFoundError";
import { FailedSavingModelError } from "../Errors/Http/500/FailedSavingModelError";
import { hashPassword } from "../Helpers/Functions/hashPassword";
import { verifyPassword } from "../Helpers/Functions/verifyPassword";
import { HttpController } from "./_HttpController";

export class UserController extends HttpController {
    constructor() {
        super();

        this.application.server.route({
            method: 'POST',
            url: '/user/register',
            handler: this.register
        });

        this.application.server.route({
            method: 'POST',
            url: '/user/login',
            handler: this.login
        });
    }

    private async register(request: FastifyRequest, reply: FastifyReply<ServerResponse>) {
        const db = Db.getInstance();

        if ((await db.models.user.find({email: request.body.email})).length) {
            throw new UserAlreadyExistsError('email', request.body.email);
        }

        if ((await db.models.user.find({username: request.body.username})).length) {
            throw new UserAlreadyExistsError('username', request.body.username);
        }

        const user = new db.models.user({
            username: request.body.username,
            email: request.body.email,
            password: await hashPassword(request.body.password),
        });

        reply.type(ResponseTypes.JSON);

        const session = new Session(user, request.body.client);

        user.sessions.push(session);

        try {
            await user.save();
        } catch (e) {
            throw new FailedSavingModelError(e, 'User', user);
        }

        return user;
    }

    private async login(request: FastifyRequest, reply: FastifyReply<ServerResponse>) {
        const db = Db.getInstance();

        let user: User;

        if (request.body.email) {
            const users = await db.models.user.find({email: request.body.email});

            if (!users.length) {
                throw new UserNotFoundError('email', request.body.email);
            }

            user = users[0];
        } else {
            const users = await db.models.user.find({username: request.body.username});

            if (!users.length) {
                throw new UserNotFoundError('username', request.body.username);
            }

            user = users[0];
        }

        if (!await verifyPassword(request.body.password, user.password)) {
            throw new IncorrectPasswordError();
        }

        const session = new Session(user, request.body.client);

        user.sessions.push(session);

        try {
            await user.save();
        } catch (e) {
            throw new FailedSavingModelError(e, 'User', user);
        }

        return session;
    }
}