import { Module } from 'noose-injection';
import { MetricDataSourceAnnotation } from './metric-data-source-annotations';
import { MetricDatabaseEntitiesAnnotation } from './metric-database-annotations';
import { MetricDatabaseEntities } from './metric-database-entities';
import { TypeORMMetricDataSource } from './typeorm-metric-data-source';

export class MetricDataSourceModule extends Module {
    configure(): void {
        this.registerClass(
            MetricDatabaseEntitiesAnnotation,
            MetricDatabaseEntities
        );
        this.registerClass(MetricDataSourceAnnotation, TypeORMMetricDataSource);
    }
}
