import { FastifyReply, FastifyRequest } from 'fastify';
import { ServerResponse } from 'http';
import { Application } from '../Classes/Application';
import { ResponseTypes } from '../Enums/ResponseTypes';

export class StatusController {
    private application: Application = Application.getInstance();

    constructor() {
        this.application.server.get('/status/ping', this.ping);
        this.application.server.get('/status/uptime', this.uptime);
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