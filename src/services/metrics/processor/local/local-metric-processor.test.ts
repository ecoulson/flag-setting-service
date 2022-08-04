import { instance, mock, verify, when } from 'ts-mockito';
import { Optional } from '../../../../common/optional/optional';
import { Message } from '../../../../models/messages/message';
import { ElapsedTimeMetric } from '../../../../models/metrics/elasped-time-metric';
import { MetricStorage } from '../../../../storage/metrics/metric-storage';
import { LocalMetricProcessor } from './local-metric-processor';

describe('Local Metric Processor Test Suite', () => {
    const id = 'f6681930-cd4f-4cf7-a9e1-763f7f39c674';
    const mockedStorage = mock<MetricStorage<ElapsedTimeMetric>>();
    const processor = new LocalMetricProcessor(instance(mockedStorage));

    test('Should store the metric', async () => {
        const metric = new ElapsedTimeMetric(id, 'tag', 10);
        const message = new Message(id, 'topic', metric);
        when(mockedStorage.create(metric)).thenResolve(Optional.of(metric));

        const result = await processor.process(message);

        expect(result).toBeTruthy();
        verify(mockedStorage.create(metric)).once();
    });
});
