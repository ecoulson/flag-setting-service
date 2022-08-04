import { MetricServiceModule } from '.';
import { MetricProcessorModule } from './processor';
import { MetricRecorderModule } from './recorder';

describe('Metric Service Module Test Suite', () => {
    const module = new MetricServiceModule();

    beforeAll(() => {
        module.configure();
    });

    test('Should register expected modules', () => {
        expect(module.isRegistered(MetricRecorderModule)).toBeTruthy();
        expect(module.isRegistered(MetricProcessorModule)).toBeTruthy();
    });
});
