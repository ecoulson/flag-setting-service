import { Module } from 'noose-injection';
import { MessageConnectionStrategy } from './message-connection-strategy';
import {
    MessageConnectionStrategyAnnotation,
    MessageDatabaseAnnotation,
    MessageDatabaseEntitiesAnnotation,
} from './message-database-annotations';
import { MessageDatabaseEntities } from './message-database-entities';
import { TypeORMMessageDataSource } from './typeorm-message-data-source';

export class MessageDatabaseModule extends Module {
    configure(): void {
        this.registerClass(MessageDatabaseAnnotation, TypeORMMessageDataSource);
        this.registerClass(
            MessageDatabaseEntitiesAnnotation,
            MessageDatabaseEntities
        );
        this.registerClass(
            MessageConnectionStrategyAnnotation,
            MessageConnectionStrategy
        );
    }
}
