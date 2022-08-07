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
import { IdentifierGenerator } from '../../../../identifiers/identifier-generator';
import { MessageQueue } from '../../../../message-queues/message-queue';
import { LocalMetricRecorder } from './local-metric-recorder';
import { ElapsedTimeMetric } from '../../../../models/metrics/elasped-time-metric';
import { Status } from '../../../../common/status/status';

describe('Local Metric Service Test Suite', () => {
    const id = '8a8b0354-b29c-47a8-a332-ef601e198346';
    const mockedIdentifierService = mock<IdentifierGenerator>();
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
        when(mockedQueueService.publish(anyOfClass(Message))).thenResolve(
            Status.ok()
        );
        when(mockedIdentifierService.generate()).thenReturn(id);
        const metric = new ElapsedTimeMetric(id, 'time', 100);

        const result = await recorder.record(metric);

        expect(result.ok()).toBeTruthy();
        verify(mockedIdentifierService.generate()).once();
        verify(mockedQueueService.publish(anyOfClass(Message))).once();
        const [actualMessage] = capture(mockedQueueService.publish).last();
        expect(actualMessage.data).toBe(metric);
        expect(actualMessage.id).toEqual(id);
        expect(actualMessage.topic).toEqual('metric');
    });

    test('Should call the metrics service and fail to enqueue a message', async () => {
        const metric = new ElapsedTimeMetric(id, 'time', 100);
        when(mockedQueueService.publish(anyOfClass(Message))).thenResolve(
            Status.error()
        );
        when(mockedIdentifierService.generate()).thenReturn(id);

        const result = await recorder.record(metric);

        expect(result.ok()).toBeFalsy();
        verify(mockedQueueService.publish(anyOfClass(Message))).once();
        verify(mockedQueueService.publish(anyOfClass(Message))).once();
        const [actualMessage] = capture(mockedQueueService.publish).last();
        expect(actualMessage.data).toBe(metric);
        expect(actualMessage.id).toEqual(id);
        expect(actualMessage.topic).toEqual('metric');
    });
});
