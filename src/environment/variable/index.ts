import { Module } from 'noose-injection';
import { EnvironmentVariable } from './environment-variable';
import {
    DatabaseURLVariableAnnotation,
    DialectVariableAnnotation,
    DropSchemaVariableAnnotation,
    LogLevelVariableAnnotation,
    LogsDatabaseURLVariableAnnotation,
    MetricDatabaseURLVariableAnnotation,
    SynchronizeVariableAnnotation,
} from './environment-variable-annotations';

export class EnvironmentVariableModule extends Module {
    configure(): void {
        this.registerValue(
            DatabaseURLVariableAnnotation,
            new EnvironmentVariable('DATABASE_URL')
        );
        this.registerValue(
            LogLevelVariableAnnotation,
            new EnvironmentVariable('LOG_LEVEL')
        );
        this.registerValue(
            DropSchemaVariableAnnotation,
            new EnvironmentVariable('DROP_SCHEMA')
        );
        this.registerValue(
            SynchronizeVariableAnnotation,
            new EnvironmentVariable('SYNCHRONIZE')
        );
        this.registerValue(
            DialectVariableAnnotation,
            new EnvironmentVariable('DATABASE_DIALECT')
        );
        this.registerValue(
            MetricDatabaseURLVariableAnnotation,
            new EnvironmentVariable('METRIC_DATABASE_URL')
        );
        this.registerValue(
            LogsDatabaseURLVariableAnnotation,
            new EnvironmentVariable('LOGS_DATABASE_URL')
        );
    }
}
