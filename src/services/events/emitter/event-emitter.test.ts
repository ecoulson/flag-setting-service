import { instance, mock, verify } from 'ts-mockito';
import { Event } from '../../../models/events/event';
import { EventEmitter } from './event-emitter';
import { EventHandler } from './event-handler';

describe('Event Emitter Test Suite', () => {
    const eventEmitter = new EventEmitter();

    test('Should add a new listener to the event emitter', () => {
        const listener = jest.fn();

        const result = eventEmitter.addListener('event', listener);
        eventEmitter.emit(new Event('id', 'event', {}));

        expect(result).toBeTruthy();
        expect(listener).toBeCalled();
    });

    test('Should add a new listener to the event emitter multiple times', () => {
        const listener = jest.fn();

        eventEmitter.addListener('event', listener);
        const result = eventEmitter.addListener('event', listener);
        eventEmitter.emit(new Event('id', 'event', {}));

        expect(result).toBeTruthy();
        expect(listener).toBeCalledTimes(2);
    });

    test('Should remove a listener from the event listener', () => {
        const listener = jest.fn();

        eventEmitter.addListener('event', listener);
        const result = eventEmitter.removeListener('event', listener);
        eventEmitter.emit(new Event('id', 'event', {}));

        expect(result).toBeTruthy();
        expect(listener).not.toBeCalled();
    });

    test('Should emit an event', () => {
        const listener = jest.fn();

        const result = eventEmitter.addListener('event', listener);
        eventEmitter.emit(new Event('id', 'event', {}));

        expect(result).toBeTruthy();
        expect(listener).toBeCalled();
    });
});
