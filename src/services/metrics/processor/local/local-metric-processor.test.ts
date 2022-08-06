import { instance, mock, reset, verify, when } from 'ts-mockito';
import { Optional } from '../../../../common/optional/optional';
import { Message } from '../../../../models/messages/message';
import { ElapsedTimeMetric } from '../../../../models/metrics/elasped-time-metric';
import { MetricType } from '../../../../models/metrics/metric-type';
import { MetricStorage } from '../../../../storage/metrics/metric-storage';
import { MetricStorageRetriever } from '../../storage-retriever/metric-storage-retriever';
import { LocalMetricProcessor } from './local-metric-processor';

describe('Local Metric Processor Test Suite', () => {
    const id = 'f6681930-cd4f-4cf7-a9e1-763f7f39c674';
    const mockedElapsedTimeMetricStorage =
        mock<MetricStorage<ElapsedTimeMetric>>();
    const mockedStorageRetriever = mock<MetricStorageRetriever>();
    when(mockedStorageRetriever.retrieve(MetricType.ElapsedTime)).thenReturn(
        instance(mockedElapsedTimeMetricStorage)
    );
    const processor = new LocalMetricProcessor(
        instance(mockedStorageRetriever)
    );

    beforeEach(() => {
        reset(mockedElapsedTimeMetricStorage);
    });

    test('Should store the metric', async () => {
        const metric = new ElapsedTimeMetric(id, 'tag', 10);
        const message = new Message(id, 'topic', metric);
        when(mockedElapsedTimeMetricStorage.create(metric)).thenResolve(
            Optional.of(metric)
        );

        const result = await processor.process(message);

        expect(result).toBeTruthy();
        verify(mockedElapsedTimeMetricStorage.create(metric)).once();
    });
});
