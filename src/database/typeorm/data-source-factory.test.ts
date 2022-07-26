import { DataSourceFactory } from './data-source-factory';

describe('Data Source Factory Test Suite', () => {
    const factory = new DataSourceFactory();

    test('Should create a data source', () => {
        const dataSource = factory.buildPostgresDatabase();

        expect(dataSource.options.type).toEqual('postgres');
    });
});
