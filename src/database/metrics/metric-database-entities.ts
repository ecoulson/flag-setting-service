import { Injectable } from 'noose-injection';
import { ElapsedTimeMetric } from '../../models/metrics/elasped-time-metric';
import { ElapsedTimeMetricAnnotation } from '../../models/model-annotation';
import { BaseDatabaseEntities } from '../entities/base-database-entities';

@Injectable()
export class MetricDatabaseEntities extends BaseDatabaseEntities {
    constructor(
        @ElapsedTimeMetricAnnotation.inject()
        elapsedTimeMetric: typeof ElapsedTimeMetric
    ) {
        super(elapsedTimeMetric);
    }
}
