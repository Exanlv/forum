import { AddressInfo } from 'net';
import { routes, Route } from './routes';
import * as fastify from 'fastify';

const server: fastify.FastifyInstance = fastify({});

routes.forEach((route: Route) => {
    const requestHandler = async (request: fastify.FastifyRequest) => {
        const handler = new route.handler(request);

        if (!(await handler.authenticate())) {
            return handler.error('errors.unauthorized');
        }

        try {
            await handler.validate();
        } catch (e) {
            return handler.error(e);
        }

        return await handler.handler();
    }

    switch (route.method) {
        case 'GET':
            server.get(route.path, requestHandler);
        case 'POST':
            server.post(route.path, requestHandler);
    }
});

server.listen(6684, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    console.log(`Server listening on port ${(server.server.address() as AddressInfo).port}`);
});