import { Injectable } from 'noose-injection';
import { Message } from '../../../models/messages/message';
import { Metric } from '../../../models/metrics/metric';
import { LocalMessageQueueAnnotation } from '../../message-queues/local/local-message-queue-annotations';
import { MessageQueueService } from '../../message-queues/message-queue-service';
import { MetricRecorderService } from './metric-recorder-service';

@Injectable()
export class LocalMetricRecorderService implements MetricRecorderService {
    constructor(
        @LocalMessageQueueAnnotation.inject()
        private readonly queueService: MessageQueueService
    ) {}

    async record(metric: Metric): Promise<boolean> {
        return await this.queueService.publish(
            new Message('', metric.tag, metric)
        );
    }
}
