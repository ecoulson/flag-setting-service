import { Status } from '../../../common/status/status';
import { Message } from '../../../models/messages/message';
import { Metric } from '../../../models/metrics/metric';

export interface MetricProcessor<T = unknown> {
    process(message: Message<Metric<T>>): Promise<Status>;
}
