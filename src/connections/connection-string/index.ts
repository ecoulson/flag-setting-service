import { Module } from 'noose-injection';
import { PostgresConnectionStringAnnotation } from './connection-string-annotation';
import { PostgreSQLConnectionString } from './postgresql-connection-string';

export class ConnectionStringModule extends Module {
    configure(): void {
        this.registerClass(
            PostgresConnectionStringAnnotation,
            PostgreSQLConnectionString
        );
    }
}
