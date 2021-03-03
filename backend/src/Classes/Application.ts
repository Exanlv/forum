import * as fastify from 'fastify';
import { ServerResponse } from 'http';
import { AddressInfo } from "net";
import { ResponseTypes } from '../Enums/ResponseTypes';
import { ERRORS } from '../Errors/Http/Errors';
import { Db } from './Db';
import { User } from './Models/User';

export class Application {
    private static _instance: Application = new Application();

    public server: fastify.FastifyInstance;

    private constructor() {
        Application._instance = this;

        this.server = fastify({});

        this.server.setErrorHandler(this.handleError);
    }

    public static getInstance() {
        return Application._instance;
    }

    private handleError(error: fastify.FastifyError & {[key: string]: any}, request: fastify.FastifyRequest, reply: fastify.FastifyReply<ServerResponse>) {
        reply.code(error.statusCode ?? 500);
        reply.type(ResponseTypes.JSON);

        const response: {[key: string]: any} = {
            message: error.message ?? ERRORS.GENERIC,
        };

        if (error.fields) {
            response.fields = error.fields;
        }

        reply.send(response);
    }

    public start() {
        this.server.listen(6684, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }

            console.log(`Server listening on port ${(this.server.server.address() as AddressInfo).port}`)
        });
    }

    public registerModels() {
        (Db.getInstance()).models = {
            user: User
        };
    }
}