import { Injectable } from 'noose-injection';
import { Message } from '../../../../models/messages/message';
import { Metric } from '../../../../models/metrics/metric';
import { UUIDIdentifierGeneratorAnnotation } from '../../../../identifiers/identifier-annotations';
import { IdentifierGenerator } from '../../../../identifiers/identifier-generator';
import { LocalMessageQueueAnnotation } from '../../../../message-queues/local/local-message-queue-annotations';
import { MessageQueue } from '../../../../message-queues/message-queue';
import { MetricRecorder } from '../metric-recorder';

@Injectable()
export class LocalMetricRecorder implements MetricRecorder {
    constructor(
        @LocalMessageQueueAnnotation.inject()
        private readonly queueService: MessageQueue<Metric>,
        @UUIDIdentifierGeneratorAnnotation.inject()
        private readonly identifierService: IdentifierGenerator
    ) {}

    async record(metric: Metric): Promise<boolean> {
        return await this.queueService.publish(
            new Message(this.identifierService.generate(), 'metric', metric)
        );
    }
}
