import 'reflect-metadata';
import { TypeORMDataSourceAnnotation } from './database/typeorm/typeorm-annotations';
import { MainModule } from './main';
import { Server } from './server/server';
import { FastifyServerAnnotation } from './server/server-annotations';
import { DataSource } from './database/data-source';
import { LoggerAnnotation } from './logging/logging-annotations';
import { Logger } from './logging/logger';
import {
    DatabaseURLVariableAnnotation,
    MetricDatabaseURLVariableAnnotation,
} from './environment/variable/environment-variable-annotations';
import { EnvironmentVariable } from './environment/variable/environment-variable';

async function main() {
    const main = new MainModule();
    main.configure();

    const logger = main.resolve<Logger>(LoggerAnnotation);

    const dataSource = main.resolve<DataSource>(TypeORMDataSourceAnnotation);
    const databaseUrl = main.resolve<EnvironmentVariable>(
        DatabaseURLVariableAnnotation
    );
    await connectToDatasource(dataSource, databaseUrl, logger);

    const metricDataSource = main.resolve<DataSource>(
        TypeORMDataSourceAnnotation
    );
    const metricDatabaseUrl = main.resolve<EnvironmentVariable>(
        MetricDatabaseURLVariableAnnotation
    );
    await connectToDatasource(metricDataSource, metricDatabaseUrl, logger);

    const server = main.resolve<Server>(FastifyServerAnnotation);
    server.listen(8080);
}

async function connectToDatasource(
    dataSource: DataSource,
    databaseUrl: EnvironmentVariable,
    logger: Logger
) {
    const dataSourceInitialized = await dataSource.initialize(databaseUrl);

    if (!dataSourceInitialized) {
        logger.fatal('Failed to initialize connection with data source');
        return;
    }
}

main();
