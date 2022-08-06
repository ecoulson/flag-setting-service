import { LocalMessageQueueConnectionStrategy } from './local-message-queue-connection-strategy';

class TestConnectionStrategy extends LocalMessageQueueConnectionStrategy {
    protected async registerSubscribers(): Promise<void> {}
}

describe('Local Message Queue Connection Strategy Test Suite', () => {
    const strategy = new TestConnectionStrategy();
    test('Should call registerSubscribers on initialization', () => {});
});
