import { Injectable } from 'noose-injection';
import { Metric } from '../../models/metrics/metric';
import { MetricProcessor } from '../../services/metrics/processor/metric-processor';
import { MetricProcessorAnnotation } from '../../services/metrics/processor/metric-processor-annotations';
import { LocalMessageQueueConnectionStrategy } from '../connection-strategy/local-message-queue-connection-strategy';
import { LocalMessageQueueAnnotation } from '../local/local-message-queue-annotations';
import { MessageQueue } from '../message-queue';

@Injectable()
export class MetricsLocalConnectionStrategy extends LocalMessageQueueConnectionStrategy<Metric> {
    constructor(
        @LocalMessageQueueAnnotation.inject()
        messageQueue: MessageQueue<Metric>,
        @MetricProcessorAnnotation.inject()
        private readonly metricProcess: MetricProcessor
    ) {
        super(messageQueue);
    }

    protected async registerSubscribers(): Promise<void> {
        this.messageQueue.subscribe('metric', this.metricProcess.process);
    }
}