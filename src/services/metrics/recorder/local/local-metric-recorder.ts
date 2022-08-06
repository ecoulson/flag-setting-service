import { Injectable } from 'noose-injection';
import { Message } from '../../../../models/messages/message';
import { Metric } from '../../../../models/metrics/metric';
import { UUIDIdentifierServiceAnnotation } from '../../../identifier/identifier-annotations';
import { IdentifierService } from '../../../identifier/identifier-service';
import { LocalMessageQueueAnnotation } from '../../../../message-queues/local/local-message-queue-annotations';
import { MessageQueue } from '../../../../message-queues/message-queue';
import { MetricRecorder } from '../metric-recorder';

@Injectable()
export class LocalMetricRecorder implements MetricRecorder {
    constructor(
        @LocalMessageQueueAnnotation.inject()
        private readonly queueService: MessageQueue<Metric>,
        @UUIDIdentifierServiceAnnotation.inject()
        private readonly identifierService: IdentifierService
    ) {}

    async record(metric: Metric): Promise<boolean> {
        return await this.queueService.publish(
            new Message(this.identifierService.generateId(), metric.tag, metric)
        );
    }
}
