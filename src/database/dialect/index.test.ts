import { DialectModule } from '.';
import { EnvironmentModule } from '../../environment';
import { DialectAnnotation } from './dialect-annotations';

describe('Dialect Module Test Suite', () => {
    const module = new DialectModule();

    beforeAll(() => {
        new EnvironmentModule().configure();
        module.configure();
    });

    test('Should resolve the dialect annotation', () => {
        const dialect = module.resolve(DialectAnnotation);

        expect(dialect).not.toBeNull();
    });
});
