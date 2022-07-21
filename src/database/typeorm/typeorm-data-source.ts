import { Injectable } from 'noose-injection';
import { DataSource as PostgreSQLDataSource, Repository } from 'typeorm';
import { Flag } from '../../models/flags/flag';
import { ConnectionString } from '../connection-string/connection-string';
import { PostgresConnectionStringAnnotation } from '../connection-string/connection-string-annotation';
import { DataSource } from '../data-source';
import { Dialect } from '../dialect/dialect';
import { DialectAnnotation } from '../dialect/dialect-annotations';
import { DialectType } from '../dialect/dialect-type';
import { SystemEnvironmentDialect } from '../dialect/system-environment-dialect';
import { PostgreSQLDataSourceAnnotation } from './typeorm-annotations';

@Injectable()
export class TypeORMDataSource implements DataSource {
    constructor(
        @PostgreSQLDataSourceAnnotation.inject()
        private readonly dataSource: PostgreSQLDataSource,
        @PostgresConnectionStringAnnotation.inject()
        private readonly connectionString: ConnectionString,
        @DialectAnnotation.inject()
        private readonly dialect: Dialect
    ) {}

    async initialize(): Promise<boolean> {
        const connectionParameters = this.connectionString.parse();
        if (!connectionParameters.isPresent()) {
            console.log(
                'No connection string is present in the environment. Please set one in your system variables.'
            );
            return false;
        } else if (this.dialect.type() === DialectType.UNKNOWN) {
            console.log(
                'No database dialect has been selected. Please set one in your system environment'
            );
            return false;
        } else {
            await this.dataSource
                .setOptions({
                    type: this.dialect as any,
                    ...connectionParameters.get(),
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
