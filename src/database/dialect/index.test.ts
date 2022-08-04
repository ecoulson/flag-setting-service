import { DialectModule } from '.';
import { EnvironmentModule } from '../../environment';
import { DialectAnnotation } from './dialect-annotations';
import { SystemEnvironmentDialect } from './system-environment-dialect';

describe('Dialect Module Test Suite', () => {
    const module = new DialectModule();

    beforeAll(() => {
        new EnvironmentModule().configure();
        module.configure();
    });

    test('Should resolve the dialect annotation', () => {
        const dialect = module.resolve(DialectAnnotation);

        expect(dialect).toBeInstanceOf(SystemEnvironmentDialect);
    });
});
