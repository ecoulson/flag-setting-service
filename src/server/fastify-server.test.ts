import { FastifyInstance } from 'fastify';
import { anything, instance, mock, verify } from 'ts-mockito';
import { FastifyServer } from './fastify-server';

describe('Server Test Suite', () => {
    const mockedFastifyInstance = mock<FastifyInstance>();
    const server = new FastifyServer(instance(mockedFastifyInstance));

    test('Should start the server', () => {
        server.listen(8080);

        verify(mockedFastifyInstance.listen(anything())).once();
    });
});
