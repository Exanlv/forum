import * as fastify from 'fastify';
import { AddressInfo } from "net";

export class Application {
    private static _instance: Application = new Application();

    public server: fastify.FastifyInstance;

    private constructor() {
        Application._instance = this;

        this.server = fastify({});

        this.server.listen(6684, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }

            console.log(`Server listening on port ${(this.server.server.address() as AddressInfo).port}`)
        });
    }
b
    public static getInstance() {
        return Application._instance;
    }
}