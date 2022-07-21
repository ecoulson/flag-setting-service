import { Module } from 'noose-injection';
import { TypeORMDataSource } from './typeorm-data-source';
import {
    TypeORMDataSourceAnnotation,
    PostgreSQLDataSourceAnnotation,
} from './typeorm-annotations';
import { DataSource } from 'typeorm';
import { TypeORMRepositoriesModule } from './repositories';

export class TypeORMModule extends Module {
    configure(): void {
        this.registerValue(
            PostgreSQLDataSourceAnnotation,
            new DataSource({ type: 'postgres' })
        );
        this.registerClass(TypeORMDataSourceAnnotation, TypeORMDataSource);
        this.registerModule(new TypeORMRepositoriesModule());
    }
}
