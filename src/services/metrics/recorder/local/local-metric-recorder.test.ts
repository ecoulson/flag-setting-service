import {
    anyOfClass,
    capture,
    instance,
    mock,
    reset,
    spy,
    verify,
    when,
} from 'ts-mockito';
import { Message } from '../../../../models/messages/message';
import { Metric } from '../../../../models/metrics/metric';
import { IdentifierService } from '../../../identifier/identifier-service';
import { MessageQueue } from '../../../../message-queues/message-queue';
import { LocalMetricRecorder } from './local-metric-recorder';
import { ElapsedTimeMetric } from '../../../../models/metrics/elasped-time-metric';

describe('Local Metric Service Test Suite', () => {
    const id = '8a8b0354-b29c-47a8-a332-ef601e198346';
    const mockedIdentifierService = mock<IdentifierService>();
    const mockedQueueService = mock<MessageQueue<Metric>>();
    const recorder = new LocalMetricRecorder(
        instance(mockedQueueService),
        instance(mockedIdentifierService)
    );

    beforeEach(() => {
        reset(mockedQueueService);
        reset(mockedIdentifierService);
    });

    test('Should call the metrics service and enqueue a new message', async () => {
        when(mockedQueueService.publish(anyOfClass(Message))).thenResolve(true);
        when(mockedIdentifierService.generateId()).thenReturn(id);
        const metric = new ElapsedTimeMetric(id, 'time', 100);

        const result = await recorder.record(metric);

        expect(result).toBeTruthy();
        verify(mockedIdentifierService.generateId()).once();
        verify(mockedQueueService.publish(anyOfClass(Message))).once();
        const [actualMessage] = capture(mockedQueueService.publish).last();
        expect(actualMessage.data).toBe(metric);
        expect(actualMessage.id).toEqual(id);
        expect(actualMessage.topic).toEqual('metric');
    });

    test('Should call the metrics service and fail to enqueue a message', async () => {
        const metric = new ElapsedTimeMetric(id, 'time', 100);
        when(mockedQueueService.publish(anyOfClass(Message))).thenResolve(
            false
        );
        when(mockedIdentifierService.generateId()).thenReturn(id);

        const result = await recorder.record(metric);

        expect(result).toBeFalsy();
        verify(mockedQueueService.publish(anyOfClass(Message))).once();
        verify(mockedQueueService.publish(anyOfClass(Message))).once();
        const [actualMessage] = capture(mockedQueueService.publish).last();
        expect(actualMessage.data).toBe(metric);
        expect(actualMessage.id).toEqual(id);
        expect(actualMessage.topic).toEqual('metric');
    });
});
