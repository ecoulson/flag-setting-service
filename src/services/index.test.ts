import { ServiceModule } from '.';
import { FlagServiceModule } from './flags';
import IdentifierServiceModule from './identifier';
import { MetricServiceModule } from './metrics';

describe('Service Module Test Suite', () => {
    const module = new ServiceModule();

    beforeAll(() => {
        module.configure();
    });

    test('Should register expected modules', () => {
        expect(module.isRegistered(FlagServiceModule)).toBeTruthy();
        expect(module.isRegistered(IdentifierServiceModule)).toBeTruthy();
        expect(module.isRegistered(MetricServiceModule)).toBeTruthy();
    });
});
