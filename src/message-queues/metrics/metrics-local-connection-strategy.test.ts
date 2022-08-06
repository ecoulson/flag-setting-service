import { anyFunction, instance, mock, verify } from 'ts-mockito';
import { Metric } from '../../models/metrics/metric';
import { LocalMetricProcessor } from '../../services/metrics/processor/local/local-metric-processor';
import { MessageQueue } from '../message-queue';
import { MetricsLocalConnectionStrategy } from './metrics-local-connection-strategy';

describe('Metrics Local Connection Strategy Test Suite', () => {
    const mockedMessageQueue = mock<MessageQueue<Metric>>();
    const mockedMessageProcessor = mock(LocalMetricProcessor);
    const strategy = new MetricsLocalConnectionStrategy(
        instance(mockedMessageQueue),
        instance(mockedMessageProcessor)
    );

    test('Should the metric processor should subscribe to the metric channel', async () => {
        await strategy.initialize();

        verify(mockedMessageQueue.subscribe('metric', anyFunction())).once();
    });
});
