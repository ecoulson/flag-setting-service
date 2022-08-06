import { EventModule } from '.';
import { EventEmitterModule } from './emitter';

describe('Event Module Test Suite', () => {
    const module = new EventModule();

    beforeAll(() => {
        module.configure();
    });

    test('Should register expected modules', () => {
        expect(module.isRegistered(EventEmitterModule)).toBeTruthy();
    });
});
