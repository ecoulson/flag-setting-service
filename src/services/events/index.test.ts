import { EventServiceModule } from '.';
import { EventEmitterModule } from './emitter';

describe('Event Module Test Suite', () => {
    const module = new EventServiceModule();

    beforeAll(() => {
        module.configure();
    });

    test('Should register expected modules', () => {
        expect(module.isRegistered(EventEmitterModule)).toBeTruthy();
    });
});
