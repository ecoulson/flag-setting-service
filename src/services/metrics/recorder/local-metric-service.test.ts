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
import { MessageQueueService } from '../../message-queues/message-queue-service';
import { LocalMetricRecorderService } from './local-metric-service';

describe('Local Metric Service Test Suite', () => {
    const mockedQueueService = mock<MessageQueueService>();
    const service = new LocalMetricRecorderService(
        instance(mockedQueueService)
    );

    beforeEach(() => {
        reset(mockedQueueService);
    });

    test('Should call the metrics service and enqueue a new message', async () => {
        when(mockedQueueService.enqueue(anyOfClass(Message))).thenResolve(true);
        const metric = new ElapsedTimeMetric('test', 0);
        const metricSpy = spy(metric);

        const result = await service.record(metric);

        expect(result).toBeTruthy();
        verify(mockedQueueService.enqueue(anyOfClass(Message))).once();
        verify(metricSpy.tag()).once();
    });

    test('Should call the metrics service and fail to enqueue a message', async () => {
        when(mockedQueueService.enqueue(anyOfClass(Message))).thenResolve(
            false
        );
        const metric = new ElapsedTimeMetric('test', 0);
        const metricSpy = spy(metric);

        const result = await service.record(metric);
        expect(result).toBeFalsy();
        verify(mockedQueueService.enqueue(anyOfClass(Message))).once();
        verify(metricSpy.tag()).once();
    });
});
