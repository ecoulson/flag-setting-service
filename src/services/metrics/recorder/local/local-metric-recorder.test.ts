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
import { MessageQueueService } from '../../../message-queues/message-queue-service';
import { LocalMetricRecorder } from './local-metric-recorder';

describe('Local Metric Service Test Suite', () => {
    const id = '8a8b0354-b29c-47a8-a332-ef601e198346';
    const mockedIdentifierService = mock<IdentifierService>();
    const mockedMetric = mock<Metric>();
    const mockedQueueService = mock<MessageQueueService<Metric>>();
    const service = new LocalMetricRecorder(
        instance(mockedQueueService),
        instance(mockedIdentifierService)
    );

    beforeEach(() => {
        reset(mockedMetric);
        reset(mockedQueueService);
        reset(mockedIdentifierService);
    });

    test('Should call the metrics service and enqueue a new message', async () => {
        when(mockedQueueService.publish(anyOfClass(Message))).thenResolve(true);
        when(mockedMetric.tag).thenReturn('foo');
        when(mockedIdentifierService.generateId()).thenReturn(id);
        const metric = instance(mockedMetric);

        const result = await service.record(metric);

        expect(result).toBeTruthy();
        verify(mockedMetric.tag).once();
        verify(mockedIdentifierService.generateId()).once();
        verify(mockedQueueService.publish(anyOfClass(Message))).once();
        const [actualMessage] = capture(mockedQueueService.publish).last();
        expect(actualMessage.data).toBe(metric);
        expect(actualMessage.id).toEqual(id);
        expect(actualMessage.topic).toEqual(metric.tag);
    });

    test('Should call the metrics service and fail to enqueue a message', async () => {
        when(mockedQueueService.publish(anyOfClass(Message))).thenResolve(
            false
        );
        when(mockedMetric.tag).thenReturn('foo');
        when(mockedIdentifierService.generateId()).thenReturn(id);
        const metric = instance(mockedMetric);

        const result = await service.record(metric);

        expect(result).toBeFalsy();
        verify(mockedQueueService.publish(anyOfClass(Message))).once();
        verify(mockedMetric.tag).once();
        verify(mockedQueueService.publish(anyOfClass(Message))).once();
        const [actualMessage] = capture(mockedQueueService.publish).last();
        expect(actualMessage.data).toBe(metric);
        expect(actualMessage.id).toEqual(id);
        expect(actualMessage.topic).toEqual(metric.tag);
    });
});
