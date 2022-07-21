import { DatabaseDebugModule } from '.';
import { EnvironmentModule } from '../../environment';
import { DatabaseDebugAnnotation } from './debug-annotation';

describe('Database Debug Module Test Suite', () => {
    const module = new DatabaseDebugModule();

    beforeAll(() => {
        new EnvironmentModule().configure();
        module.configure();
    });

    test('Should resolve the debug annotation', () => {
        const debugInfo = module.resolve(DatabaseDebugAnnotation);

        expect(debugInfo).not.toBeNull();
    });
});
