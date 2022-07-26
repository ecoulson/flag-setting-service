import { Module } from 'noose-injection';
import { TypeORMDataSource } from './typeorm-data-source';
import {
    TypeORMDataSourceAnnotation,
    DataSourceFactoryAnnotation,
} from './typeorm-annotations';
import { TypeORMRepositoriesModule } from './repositories';
import { DataSourceFactory } from './data-source-factory';

export class TypeORMModule extends Module {
    configure(): void {
        this.registerClass(DataSourceFactoryAnnotation, DataSourceFactory);
        this.registerClass(TypeORMDataSourceAnnotation, TypeORMDataSource);
        this.registerModule(new TypeORMRepositoriesModule());
    }
}
