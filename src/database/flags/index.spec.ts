import { FlagDatabaseModule } from '.';
import { EnvironmentModule } from '../../environment';
import { LoggingModule } from '../../logging';
import { ModelModule } from '../../models';
import { ConnectionStringModule } from '../connection-string';
import { DatabaseDebugModule } from '../debug-info';
import { DialectModule } from '../dialect';
import { TypeORMModule } from '../typeorm';
import {
    FlagDatabaseAnnotation,
    FlagDatabaseEntitiesAnnotation,
} from './flag-database-annotations';
import { FlagDatabaseEntities } from './flag-database-entities';
import { TypeORMFlagDataSource } from './typeorm-flag-data-source';

describe('Flag Database Module Test Suite', () => {
    const module = new FlagDatabaseModule();

    beforeAll(() => {
        new ModelModule().configure();
        new DialectModule().configure();
        new DatabaseDebugModule().configure();
        new EnvironmentModule().configure();
        new TypeORMModule().configure();
        new LoggingModule().configure();
        new ConnectionStringModule().configure();
        module.configure();
    });

    test('Should resolve the flag database entities annotation', () => {
        const entities = module.resolve(FlagDatabaseEntitiesAnnotation);

        expect(entities).toBeInstanceOf(FlagDatabaseEntities);
    });

    test('Should resolve the flag database annotation', () => {
        const database = module.resolve(FlagDatabaseAnnotation);

        expect(database).toBeInstanceOf(TypeORMFlagDataSource);
    });
});
