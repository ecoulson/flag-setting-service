import { Module } from 'noose-injection';
import {
    DatabaseURLAnnotation,
    PostgresConnectionStringAnnotation,
} from './connection-string-annotation';
import { DatabaseURL } from './database-url';
import { PostgreSQLConnectionString } from './postgresql-connection-string';

export class ConnectionStringModule extends Module {
    configure(): void {
        this.registerClass(
            PostgresConnectionStringAnnotation,
            PostgreSQLConnectionString
        );
        this.registerClass(DatabaseURLAnnotation, DatabaseURL);
    }
}
