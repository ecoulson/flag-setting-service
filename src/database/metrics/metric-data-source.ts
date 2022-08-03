import { Optional } from '../../common/optional/optional';
import { ElapsedTimeMetric } from '../../models/metrics/elasped-time-metric';
import { Broker } from '../broker/broker';
import { DataSource } from '../data-source';

export interface MetricDataSource extends DataSource {
    getElapsedTimeMetricBroker(): Optional<Broker<ElapsedTimeMetric>>;
}
