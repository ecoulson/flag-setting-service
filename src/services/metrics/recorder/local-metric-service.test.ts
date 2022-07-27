import {
    anyOfClass,
    instance,
    mock,
    reset,
    spy,
    verify,
    when,
} from 'ts-mockito';
import { Message } from '../../../models/messages/message';
import { ElapsedTimeMetric } from '../../../models/metrics/elasped-time-metric';
import { Metric } from '../../../models/metrics/metric';
import { MessageQueueService } from '../../message-queues/message-queue-service';
import { LocalMetricRecorderService } from './local-metric-service';

describe('Local Metric Service Test Suite', () => {
    const id = '8a8b0354-b29c-47a8-a332-ef601e198346';
    const mockedMetric = mock<Metric>();
    const mockedQueueService = mock<MessageQueueService>();
    const service = new LocalMetricRecorderService(
        instance(mockedQueueService)
    );

    beforeEach(() => {
        reset(mockedMetric);
        reset(mockedQueueService);
    });

    test('Should call the metrics service and enqueue a new message', async () => {
        when(mockedQueueService.publish(anyOfClass(Message))).thenResolve(true);
        when(mockedMetric.tag).thenReturn('foo');
        const metric = instance(mockedMetric);

        const result = await service.record(metric);

        expect(result).toBeTruthy();
        verify(mockedQueueService.publish(anyOfClass(Message))).once();
        verify(mockedMetric.tag).once();
    });

    test('Should call the metrics service and fail to enqueue a message', async () => {
        when(mockedQueueService.publish(anyOfClass(Message))).thenResolve(
            false
        );
        when(mockedMetric.tag).thenReturn('foo');
        const metric = instance(mockedMetric);

        const result = await service.record(metric);
        expect(result).toBeFalsy();
        verify(mockedQueueService.publish(anyOfClass(Message))).once();
        verify(mockedMetric.tag).once();
    });
});
