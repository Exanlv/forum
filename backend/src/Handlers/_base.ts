import { FastifyRequest, FastifyReply } from "fastify";

export abstract class BaseHandler {
    public headers: {[header: string]: string};

    public constructor(request: FastifyRequest) {
        this.headers = request.headers;
    }

    public async authenticate() {
        return true;
    }

    public async validate() {

    }

    public async error(error: string) {
        return {
            status: 'error',
            message: error
        };
    }
}