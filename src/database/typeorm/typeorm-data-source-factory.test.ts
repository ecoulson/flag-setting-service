import { TypeORMDataSourceFactory } from './typeorm-data-source-factory';

describe('TypeORM Data Source Factory Test Suite', () => {
    const factory = new TypeORMDataSourceFactory();

    test('Should create a data source', () => {
        const dataSource = factory.buildPostgresDatabase();

        expect(dataSource.options.type).toEqual('postgres');
    });
});
