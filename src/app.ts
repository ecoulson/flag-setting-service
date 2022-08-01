import * as dotenv from 'dotenv';
dotenv.config();
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
    const container = new MainModule();
    container.configure();

    const logger = container.resolve<Logger>(LoggerAnnotation);

    const dataSource = container.resolve<DataSource>(
        TypeORMDataSourceAnnotation
    );
    const databaseUrl = container.resolve<EnvironmentVariable>(
        DatabaseURLVariableAnnotation
    );
    const isConnectedToDatabase = await connectToDatasource(
        dataSource,
        databaseUrl,
        logger
    );
    if (!isConnectedToDatabase) {
        return;
    }

    const metricDataSource = container.resolve<DataSource>(
        TypeORMDataSourceAnnotation
    );
    const metricDatabaseUrl = container.resolve<EnvironmentVariable>(
        MetricDatabaseURLVariableAnnotation
    );
    const isConnectedToMetricDatabase = await connectToDatasource(
        metricDataSource,
        metricDatabaseUrl,
        logger
    );
    if (!isConnectedToMetricDatabase) {
        return;
    }

    const server = container.resolve<Server>(FastifyServerAnnotation);
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
        return false;
    }
    return true;
}

main();
