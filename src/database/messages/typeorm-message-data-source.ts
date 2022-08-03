import { Injectable } from 'noose-injection';
import { Optional } from '../../common/optional/optional';
import { Logger } from '../../logging/logger';
import { LoggerAnnotation } from '../../logging/logging-annotations';
import { Message } from '../../models/messages/message';
import { Broker } from '../broker/broker';
import { ConnectionString } from '../connection-string/connection-string';
import { PostgresConnectionStringAnnotation } from '../connection-string/connection-string-annotation';
import { DatabaseDebugInfo } from '../debug-info/database-debug-info';
import { DatabaseDebugInfoAnnotation } from '../debug-info/debug-annotation';
import { Dialect } from '../dialect/dialect';
import { DialectAnnotation } from '../dialect/dialect-annotations';
import { DataSourceFactoryAnnotation } from '../typeorm/typeorm-annotations';
import { TypeORMDataSource } from '../typeorm/typeorm-data-source';
import { TypeORMDataSourceFactory } from '../typeorm/typeorm-data-source-factory';
import { MessageDataSource } from './message-data-source';
import { MessageDatabaseEntitiesAnnotation } from './message-database-annotations';
import { MessageDatabaseEntities } from './message-database-entities';

@Injectable()
export class TypeORMMessageDataSource
    extends TypeORMDataSource
    implements MessageDataSource
{
    constructor(
        @DataSourceFactoryAnnotation.inject()
        dataSourceFactory: TypeORMDataSourceFactory,
        @PostgresConnectionStringAnnotation.inject()
        connectionString: ConnectionString,
        @DialectAnnotation.inject()
        dialect: Dialect,
        @DatabaseDebugInfoAnnotation.inject()
        debugInfo: DatabaseDebugInfo,
        @MessageDatabaseEntitiesAnnotation.inject()
        entities: MessageDatabaseEntities,
        @LoggerAnnotation.inject()
        logger: Logger
    ) {
        super(
            dataSourceFactory,
            connectionString,
            dialect,
            debugInfo,
            entities,
            logger
        );
    }

    getMessageBroker(): Optional<Broker<Message>> {
        return this.getBroker(Message);
    }
}
