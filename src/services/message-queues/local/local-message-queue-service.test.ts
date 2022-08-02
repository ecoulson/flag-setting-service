import {
    anyFunction,
    anyOfClass,
    capture,
    instance,
    mock,
    reset,
    verify,
    when,
} from 'ts-mockito';
import { Event } from '../../../models/events/event';
import { Message } from '../../../models/messages/message';
import { EventEmitter } from '../../events/emitter/event-emitter';
import { IdentifierService } from '../../identifier/identifier-service';
import { LocalMessageQueueService } from './local-message-queue-service';

describe('Local Message Queue Service Test Suite', () => {
    const mockedEventEmitter = mock(EventEmitter);
    const mockedIdentifierService = mock<IdentifierService>();
    const id = '4f158c46-3951-48ab-81d8-1cc7699a366f';
    const eventId = 'ea5e861a-0c1b-4aed-978a-52c47830b632';
    const messageQueue = new LocalMessageQueueService(
        instance(mockedEventEmitter),
        instance(mockedIdentifierService)
    );

    beforeEach(() => {
        reset(mockedEventEmitter);
        reset(mockedIdentifierService);
    });

    test('Should publish an event', async () => {
        const expectedEvent = new Event(eventId, 'test', {});
        const inputMessage = new Message(id, 'test', {});
        when(mockedIdentifierService.generateId()).thenReturn(eventId);

        const result = await messageQueue.publish(inputMessage);

        expect(result).toBeTruthy();
        verify(mockedEventEmitter.emit(anyOfClass(Event))).once();
        verify(mockedIdentifierService.generateId()).once();
        const [actualEvent] = capture(mockedEventEmitter.emit).last();
        expect(actualEvent).toEqual(expectedEvent);
    });

    test('Should subscribe to a topic', async () => {
        const handler = jest.fn();
        when(mockedEventEmitter.addListener('topic', anyFunction())).thenReturn(
            true
        );

        const result = await messageQueue.subscribe('topic', handler);

        expect(result).toBeTruthy();
        verify(mockedEventEmitter.addListener('topic', anyFunction())).once();
    });
});
