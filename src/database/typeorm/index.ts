import { Module } from 'noose-injection';
import { TypeORMDataSource } from './typeorm-data-source';
import {
    TypeORMDataSourceAnnotation,
    DataSourceFactoryAnnotation,
} from './typeorm-annotations';
import { TypeORMRepositoriesModule } from './repositories';
import { TypeORMDataSourceFactory } from './typeorm-data-source-factory';

export class TypeORMModule extends Module {
    configure(): void {
        this.registerClass(
            DataSourceFactoryAnnotation,
            TypeORMDataSourceFactory
        );
        this.registerClass(TypeORMDataSourceAnnotation, TypeORMDataSource);
        this.registerModule(new TypeORMRepositoriesModule());
    }
}
