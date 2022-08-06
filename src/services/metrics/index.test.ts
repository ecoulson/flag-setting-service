import { MetricServiceModule } from '.';
import { MetricProcessorModule } from './processor';
import { MetricRecorderModule } from './recorder';
import { MetricStorageRetrieverModule } from './storage-retriever';

describe('Metric Service Module Test Suite', () => {
    const module = new MetricServiceModule();

    beforeAll(() => {
        module.configure();
    });

    test('Should register expected modules', () => {
        expect(module.isRegistered(MetricRecorderModule)).toBeTruthy();
        expect(module.isRegistered(MetricProcessorModule)).toBeTruthy();
        expect(module.isRegistered(MetricStorageRetrieverModule)).toBeTruthy();
    });
});
