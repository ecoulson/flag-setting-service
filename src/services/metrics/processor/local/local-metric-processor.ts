import { Injectable } from 'noose-injection';
import { Message } from '../../../../models/messages/message';
import { Metric } from '../../../../models/metrics/metric';
import { MetricStorage } from '../../../../storage/metrics/metric-storage';
import { MetricProcessor } from '../metric-processor';

@Injectable()
export class LocalMetricProcessor<T = unknown> implements MetricProcessor<T> {
    constructor(private readonly storage: MetricStorage) {}

    async process(message: Message<Metric<T>>): Promise<boolean> {
        await this.storage.create(message.data);
        return true;
    }
}
