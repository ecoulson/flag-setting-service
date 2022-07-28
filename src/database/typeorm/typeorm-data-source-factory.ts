import { DataSource } from 'typeorm';

export class TypeORMDataSourceFactory {
    buildPostgresDatabase(): DataSource {
        return new DataSource({ type: 'postgres' });
    }
}
