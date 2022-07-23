import { TypeORMRepositoriesModule } from '.';
import { TypeORMModule } from '..';
import { EnvironmentModule } from '../../../environment';
import { LoggingModule } from '../../../logging';
import { ModelModule } from '../../../models';
import { ConnectionStringModule } from '../../connection-string';
import { DatabaseDebugModule } from '../../debug-info';
import { DialectModule } from '../../dialect';
import { DatabaseEntitiesModule } from '../../entities';
import { FlagTypeORMRepositoryAnnotation } from './repository-annotations';

describe('TypeORM Repositores Test Suite', () => {
    const module = new TypeORMRepositoriesModule();

    beforeEach(() => {
        new EnvironmentModule().configure();
        new ConnectionStringModule().configure();
        new TypeORMModule().configure();
        new DialectModule().configure();
        new DatabaseDebugModule().configure();
        new DatabaseEntitiesModule().configure();
        new ModelModule().configure();
        new LoggingModule().configure();
        module.configure();
    });

    test('Should resolve the flag repository', () => {
        const flagRepository = module.resolve(FlagTypeORMRepositoryAnnotation);

        expect(flagRepository).not.toBeNull();
    });
});
