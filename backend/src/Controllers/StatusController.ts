import { FastifyReply, FastifyRequest } from 'fastify';
import { ServerResponse } from 'http';
import { ResponseTypes } from '../Enums/ResponseTypes';
import { Authentication } from '../Helpers/Middleware/Authentication';
import { HttpController } from './_HttpController';

export class StatusController extends HttpController {
    constructor() {
        super();

        this.application.server.route({
            method: 'GET',
            url: '/status/ping',
            handler: this.ping
        });

        this.application.server.route({
            method: 'GET',
            url: '/status/uptime',
            handler: this.uptime
        });
    }

    private async ping(request: FastifyRequest, reply: FastifyReply<ServerResponse>) {
        reply.type(ResponseTypes.PLAIN).code(200);

        return 'pong!';
    }

    private async uptime(request: FastifyRequest, reply: FastifyReply<ServerResponse>) {
        reply.type(ResponseTypes.JSON).code(200);

        return {uptime: process.uptime()};
    }
}