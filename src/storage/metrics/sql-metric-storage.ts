import { Injectable } from 'noose-injection';
import { MetricDataSource } from '../../database/metrics/metric-data-source';
import { MetricDataSourceAnnotation } from '../../database/metrics/metric-data-source-annotations';
import { Logger } from '../../logging/logger';
import { LoggerAnnotation } from '../../logging/logging-annotations';
import { Metric } from '../../models/metrics/metric';
import { SQLStorage } from '../sql-storage';
import { MetricStorage } from './metric-storage';

@Injectable()
export class SQLMetricStorage
    extends SQLStorage<Metric>
    implements MetricStorage
{
    constructor(
        @MetricDataSourceAnnotation.inject()
        dataSource: MetricDataSource,
        @LoggerAnnotation.inject()
        logger: Logger
    ) {
        super(dataSource.getElapsedTimeMetricBroker(), logger);
    }

    findByTag(tag: string): Promise<Metric[]> {
        return this.broker.findWhere({
            tag,
        });
    }
}
