import { DataSource } from 'typeorm';

export class DataSourceFactory {
    buildPostgresDatabase() {
        return new DataSource({ type: 'postgres' });
    }
}
