import { instance, mock, reset } from 'ts-mockito';
import { MessageQueue } from '../message-queue';
import { LocalMessageQueueConnectionStrategy } from './local-message-queue-connection-strategy';

class TestConnectionStrategy extends LocalMessageQueueConnectionStrategy {
    constructor(
        messageQueue: MessageQueue,
        private readonly subscriber: jest.Func
    ) {
        super(messageQueue);
    }

    protected async registerSubscribers(): Promise<void> {
        this.subscriber();
    }
}

describe('Local Message Queue Connection Strategy Test Suite', () => {
    const mockedMessageQueue = mock<MessageQueue>();
    const subscriber = jest.fn();
    const strategy = new TestConnectionStrategy(
        instance(mockedMessageQueue),
        subscriber
    );

    beforeEach(() => {
        reset(mockedMessageQueue);
        subscriber.mockReset();
    });

    test('Should call registerSubscribers on initialization', async () => {
        const status = await strategy.initialize();

        expect(status.ok()).toBeTruthy();
        expect(subscriber).toBeCalled();
    });
});
