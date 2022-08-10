import { anyNumber, instance, mock, reset, verify } from 'ts-mockito';
import { App } from './app';
import { ConnectionStrategy } from './connections/connection-strategy/connection-strategy';
import { Server } from './server/server';

describe('App Test Suite', () => {
    const mockedServer = mock<Server>();
    const mockedConnectionStrategy = mock<ConnectionStrategy>();
    const app = new App(
        instance(mockedServer),
        instance(mockedConnectionStrategy),
        instance(mockedConnectionStrategy),
        instance(mockedConnectionStrategy),
        instance(mockedConnectionStrategy)
    );

    beforeEach(() => {
        reset(mockedServer);
        reset(mockedConnectionStrategy);
    });

    test('Should initialize the server and all necessary connections', async () => {
        const status = await app.start();

        expect(status.ok()).toBeTruthy();
        verify(mockedConnectionStrategy.initialize()).times(4);
        verify(mockedServer.listen(anyNumber())).once();
    });
});
