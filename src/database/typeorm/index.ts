import { Module } from 'noose-injection';
import { DataSourceFactoryAnnotation } from './typeorm-annotations';
import { TypeORMDataSourceFactory } from './typeorm-data-source-factory';

export class TypeORMModule extends Module {
    configure(): void {
        this.registerClass(
            DataSourceFactoryAnnotation,
            TypeORMDataSourceFactory
        );
    }
}
