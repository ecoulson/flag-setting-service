import { EnvironmentVariableModule } from '.';
import { SystemEnvironmentModule } from '../system';
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

describe('Environment Variable Module', () => {
    const module = new EnvironmentVariableModule();

    beforeAll(() => {
        new SystemEnvironmentModule().configure();
        module.configure();
    });

    test('Should resolve the database url variable', () => {
        const variable = module.resolve<EnvironmentVariable>(
            DatabaseURLVariableAnnotation
        );

        expect(variable.name()).toEqual('DATABASE_URL');
    });

    test('Should resolve the log level variable', () => {
        const variable = module.resolve<EnvironmentVariable>(
            LogLevelVariableAnnotation
        );

        expect(variable.name()).toEqual('LOG_LEVEL');
    });

    test('Should resolve the drop schema variable', () => {
        const variable = module.resolve<EnvironmentVariable>(
            DropSchemaVariableAnnotation
        );

        expect(variable.name()).toEqual('DROP_SCHEMA');
    });

    test('Should resolve the synchronize variable', () => {
        const variable = module.resolve<EnvironmentVariable>(
            SynchronizeVariableAnnotation
        );

        expect(variable.name()).toEqual('SYNCHRONIZE');
    });

    test('Should resolve the dialect variable', () => {
        const variable = module.resolve<EnvironmentVariable>(
            DialectVariableAnnotation
        );

        expect(variable.name()).toEqual('DATABASE_DIALECT');
    });

    test('Should resolve the metric database url variable', () => {
        const variable = module.resolve<EnvironmentVariable>(
            MetricDatabaseURLVariableAnnotation
        );

        expect(variable.name()).toEqual('METRIC_DATABASE_URL');
    });

    test('Should resolve the logs database url variable', () => {
        const variable = module.resolve<EnvironmentVariable>(
            LogsDatabaseURLVariableAnnotation
        );

        expect(variable.name()).toEqual('LOGS_DATABASE_URL');
    });
});
