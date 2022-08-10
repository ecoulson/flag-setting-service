import { Module } from 'noose-injection';
import { MetricConnectionStrategy } from './metric-connection-strategy';
import {
    MetricConnectionStrategyAnnotation,
    MetricDatabaseEntitiesAnnotation,
    MetricDataSourceAnnotation,
} from './metric-data-source-annotations';
import { MetricDatabaseEntities } from './metric-database-entities';
import { TypeORMMetricDataSource } from './typeorm-metric-data-source';

export class MetricDatabaseModule extends Module {
    configure(): void {
        this.registerClass(
            MetricDatabaseEntitiesAnnotation,
            MetricDatabaseEntities
        );
        this.registerClass(MetricDataSourceAnnotation, TypeORMMetricDataSource);
        this.registerClass(
            MetricConnectionStrategyAnnotation,
            MetricConnectionStrategy
        );
    }
}
