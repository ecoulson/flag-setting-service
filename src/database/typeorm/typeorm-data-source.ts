import { Injectable } from 'noose-injection';
import { DataSource as PostgreSQLDataSource, Repository } from 'typeorm';
import { Flag } from '../../models/flags/flag';
import { ConnectionString } from '../connection-string/connection-string';
import { PostgresConnectionStringAnnotation } from '../connection-string/connection-string-annotation';
import { DataSource } from '../data-source';
import { PostgreSQLDataSourceAnnotation } from './typeorm-annotations';

@Injectable()
export class TypeORMDataSource implements DataSource {
    constructor(
        @PostgreSQLDataSourceAnnotation.inject()
        private readonly dataSource: PostgreSQLDataSource,
        @PostgresConnectionStringAnnotation.inject()
        private readonly connectionString: ConnectionString
    ) {}

    async initialize(): Promise<boolean> {
        const connectionParameters = this.connectionString.parse();
        if (!connectionParameters.isPresent()) {
            console.log(
                'No connection string is present in the environment. Please set one in your system variables.'
            );
            return false;
        } else {
            await this.dataSource
                .setOptions({
                    ...connectionParameters.get(),
                    type: 'postgres',
                    dropSchema: true,
                    synchronize: true,
                    logging: true,
                    entities: [Flag],
                })
                .initialize();
            return true;
        }
    }

    getRepository<T>(entity: { new (...args: any[]): T }): Repository<T> {
        return this.dataSource.getRepository(entity);
    }
}
