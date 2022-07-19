import { DataSource } from 'typeorm';
import { Flag } from '../../models/flags/flag';

export const TypeORMDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: '',
    password: '',
    database: 'flag-setting',
    dropSchema: true,
    synchronize: true,
    logging: true,
    entities: [Flag],
    subscribers: [],
    migrations: [],
});
