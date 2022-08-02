import { EventEmitterModule } from '.';
import { EventEmitterAnnotation } from './event-emitter-annotations';

describe('Event Emitter Module Test Suite', () => {
    const module = new EventEmitterModule();

    beforeAll(() => {
        module.configure();
    });

    test('Should resolve the event emitter annotation', () => {
        const emitter = module.resolve(EventEmitterAnnotation);

        expect(emitter).not.toBeNull();
    });
});
