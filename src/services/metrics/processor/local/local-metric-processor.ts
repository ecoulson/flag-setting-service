import { Message } from '../../../../models/messages/message';
import { Metric } from '../../../../models/metrics/metric';

export interface MetricProcessor {
    process(message: Message<Metric>): Promise<boolean>;
}
