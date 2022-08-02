import * as dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import { MainModule } from './main';
import { Server } from './server/server';
import { FastifyServerAnnotation } from './server/server-annotations';
import { DataSource } from './database/data-source';
import { LoggerAnnotation } from './logging/logging-annotations';
import { Logger } from './logging/logger';
import {
    FlagDatabaseURLVariableAnnotation,
    MessageQueueDatabaseURLVariableAnnotation,
} from './environment/variable/environment-variable-annotations';
import { EnvironmentVariable } from './environment/variable/environment-variable';
import { FlagDatabaseAnnotation } from './database/flags/flag-database-annotations';
import { MessageDatabaseAnnotation } from './database/messages/message-database-annotations';
import { MessageStorage } from './storage/messages/message-storage';
import { MessageStorageAnnotation } from './storage/messages/message-storage-annotations';

async function main() {
    const container = new MainModule();
    container.configure();

    const logger = container.resolve<Logger>(LoggerAnnotation);

    const dataSource = container.resolve<DataSource>(FlagDatabaseAnnotation);
    const databaseUrl = container.resolve<EnvironmentVariable>(
        FlagDatabaseURLVariableAnnotation
    );
    const isConnectedToDatabase = await connectToDatasource(
        dataSource,
        databaseUrl,
        logger
    );
    if (!isConnectedToDatabase) {
        return;
    }

    const messageDataSource = container.resolve<DataSource>(
        MessageDatabaseAnnotation
    );
    const messageDatabaseUrl = container.resolve<EnvironmentVariable>(
        MessageQueueDatabaseURLVariableAnnotation
    );
    const isConnectedToMetricDatabase = await connectToDatasource(
        messageDataSource,
        messageDatabaseUrl,
        logger
    );
    if (!isConnectedToMetricDatabase) {
        return;
    }
    const messageStorage = container.resolve<MessageStorage>(
        MessageStorageAnnotation
    );

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
