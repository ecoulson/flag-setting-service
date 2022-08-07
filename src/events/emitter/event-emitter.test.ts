import { Event } from '../../models/events/event';
import { EventEmitter } from './event-emitter';

describe('Event Emitter Test Suite', () => {
    const eventEmitter = new EventEmitter();

    test('Should add a new listener to the event emitter', () => {
        const listener = jest.fn();

        const result = eventEmitter.addListener('event', listener);
        const emitStatus = eventEmitter.emit(new Event('id', 'event', {}));

        expect(result.ok()).toBeTruthy();
        expect(listener).toBeCalled();
    });

    test('Should add a new listener to the event emitter multiple times', () => {
        const listener = jest.fn();

        eventEmitter.addListener('event', listener);
        const result = eventEmitter.addListener('event', listener);
        eventEmitter.emit(new Event('id', 'event', {}));

        expect(result.ok()).toBeTruthy();
        expect(listener).toBeCalledTimes(2);
    });

    test('Should remove a listener from the event emitter', () => {
        const listener = jest.fn();

        eventEmitter.addListener('event', listener);
        const result = eventEmitter.removeListener('event', listener);
        eventEmitter.emit(new Event('id', 'event', {}));

        expect(result.ok()).toBeTruthy();
        expect(listener).not.toBeCalled();
    });

    test('Should remove all listeners from the event emitter', () => {
        const listener = jest.fn();

        eventEmitter.addListener('event', listener);
        eventEmitter.addListener('event', listener);
        eventEmitter.addListener('event', listener);

        const result = eventEmitter.removeAllListeners();
        eventEmitter.emit(new Event('id', 'event', {}));

        expect(result.ok()).toBeTruthy();
        expect(listener).not.toBeCalled();
    });

    test('Should emit an event', () => {
        const listener = jest.fn();

        const result = eventEmitter.addListener('event', listener);
        eventEmitter.emit(new Event('id', 'event', {}));

        expect(result.ok()).toBeTruthy();
        expect(listener).toBeCalled();
    });
});
