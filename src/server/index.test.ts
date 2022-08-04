import { ServerModule } from '.';
import { FastifyServer } from './fastify-server';
import {
    FastifyInstanceAnnotation,
    FastifyServerAnnotation,
} from './server-annotations';

describe('Server Module Test Suite', () => {
    const module = new ServerModule();
    module.configure();

    test('Should have a fastify server', () => {
        const server = module.resolve(FastifyServerAnnotation);

        expect(server).toBeInstanceOf(FastifyServer);
    });

    test('Should have a fastify server instace', () => {
        const instance = module.resolve(FastifyInstanceAnnotation);

        expect(instance).not.toBeNull();
    });
});
