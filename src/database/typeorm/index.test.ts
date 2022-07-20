import { TypeORMModule } from '.';
import {
    DataSourceAnnotation,
    FlagRepositoryAnnotation,
} from './typeorm-annotations';

describe('TypeORM Module Test Suite', () => {
    const module = new TypeORMModule();

    beforeAll(() => {
        module.configure();
    });

    test('Should resolve a data source annotation', () => {
        const dataSource = module.resolve(DataSourceAnnotation);

        expect(dataSource).not.toBeNull();
    });

    test('Should resolve the flag repository annotation', () => {
        const flagRepository = module.resolve(FlagRepositoryAnnotation);

        expect(flagRepository).not.toBeNull();
    });
});
