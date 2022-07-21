import { TypeORMRepositoriesModule } from '.';
import { TypeORMModule } from '..';
import { SystemEnvironmentModule } from '../../../environment/system';
import { ConnectionStringModule } from '../../connection-string';
import { DatabaseDebugModule } from '../../debug-info';
import { DialectModule } from '../../dialect';
import { FlagTypeORMRepositoryAnnotation } from './repository-annotations';

describe('TypeORM Repositores Test Suite', () => {
    const module = new TypeORMRepositoriesModule();

    beforeEach(() => {
        new SystemEnvironmentModule().configure();
        new ConnectionStringModule().configure();
        new TypeORMModule().configure();
        new DialectModule().configure();
        new DatabaseDebugModule().configure();
        module.configure();
    });

    test('Should resolve the flag repository', () => {
        const flagRepository = module.resolve(FlagTypeORMRepositoryAnnotation);

        expect(flagRepository).not.toBeNull();
    });
});
