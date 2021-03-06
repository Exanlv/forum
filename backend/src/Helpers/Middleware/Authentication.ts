import { FastifyReply, FastifyRequest } from "fastify";
import { ServerResponse } from "http";
import { isValidObjectId } from "mongoose";
import { Db } from "../../Classes/Db";
import { AuthenticationInvalidError } from "../../Errors/Http/400/403/AuthenticationInvalidError";
import { AuthenticationRequiredError } from "../../Errors/Http/400/403/AuthenticationRequiredError";

export async function Authentication(request: FastifyRequest, reply: FastifyReply<ServerResponse>, done: Function) {
    if (!request.headers['x-auth-token'])
        throw new AuthenticationRequiredError();
    
    let [userId, sessionToken] = request.headers['x-auth-token'].split('.');

    if (!userId || !isValidObjectId(userId) || !sessionToken)
        throw new AuthenticationInvalidError();

    const users = await (Db.getInstance()).models.user.find({_id: userId});

    if (!users.length || !users[0].sessions.find((session) => {
        return session.token === sessionToken;
    })) {
        throw new AuthenticationInvalidError();
    }

    done();
}