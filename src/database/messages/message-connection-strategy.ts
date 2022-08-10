import { Injectable } from 'noose-injection';
import { EnvironmentVariable } from '../../environment/variable/environment-variable';
import { MessageQueueDatabaseURLVariableAnnotation } from '../../environment/variable/environment-variable-annotations';
import { Logger } from '../../logging/logger';
import { LoggerAnnotation } from '../../logging/logging-annotations';
import { TypeORMConnectionStrategy } from '../typeorm/typeorm-connection-strategy';
import { MessageDataSource } from './message-data-source';
import { MessageDatabaseAnnotation } from './message-database-annotations';

@Injectable()
export class MessageConnectionStrategy extends TypeORMConnectionStrategy {
    constructor(
        @MessageDatabaseAnnotation.inject()
        dataSource: MessageDataSource,
        @MessageQueueDatabaseURLVariableAnnotation.inject()
        databaseUrl: EnvironmentVariable,
        @LoggerAnnotation.inject()
        logger: Logger
    ) {
        super(dataSource, databaseUrl, logger);
    }
}
