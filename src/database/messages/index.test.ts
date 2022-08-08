import { MessageDatabaseModule } from '.';
import { EnvironmentModule } from '../../environment';
import { LoggingModule } from '../../logging';
import { ModelModule } from '../../models';
import { ConnectionStringModule } from '../../connections/connection-string';
import { DatabaseDebugModule } from '../debug-info';
import { DialectModule } from '../dialect';
import { TypeORMModule } from '../typeorm';
import {
    MessageDatabaseAnnotation,
    MessageDatabaseEntitiesAnnotation,
} from './message-database-annotations';
import { MessageDatabaseEntities } from './message-database-entities';
import { TypeORMMessageDataSource } from './typeorm-message-data-source';

describe('Messages Database Module Test Suite', () => {
    const module = new MessageDatabaseModule();

    beforeAll(() => {
        new DialectModule().configure();
        new DatabaseDebugModule().configure();
        new ModelModule().configure();
        new EnvironmentModule().configure();
        new TypeORMModule().configure();
        new LoggingModule().configure();
        new ConnectionStringModule().configure();
        module.configure();
    });

    test('Should resolve the messages database entities annotation', () => {
        const entities = module.resolve(MessageDatabaseEntitiesAnnotation);

        expect(entities).toBeInstanceOf(MessageDatabaseEntities);
    });

    test('Should resolve the messages data source annotation', () => {
        const datasource = module.resolve(MessageDatabaseAnnotation);

        expect(datasource).toBeInstanceOf(TypeORMMessageDataSource);
    });
});
