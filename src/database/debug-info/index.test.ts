import { DatabaseDebugModule } from '.';
import { EnvironmentModule } from '../../environment';
import { DatabaseDebugInfoAnnotation } from './debug-annotation';
import { SystemDatabaseDebugInfo } from './system-database-debug-info';

describe('Database Debug Module Test Suite', () => {
    const module = new DatabaseDebugModule();

    beforeAll(() => {
        new EnvironmentModule().configure();
        module.configure();
    });

    test('Should resolve the debug annotation', () => {
        const debugInfo = module.resolve(DatabaseDebugInfoAnnotation);

        expect(debugInfo).toBeInstanceOf(SystemDatabaseDebugInfo);
    });
});
