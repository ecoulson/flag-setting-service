import { Module } from 'noose-injection';
import { Flag } from '../../models/flags/flag';
import { TypeORMDataSource } from './typeorm-data-source';
import {
    DataSourceAnnotation,
    FlagRepositoryAnnotation,
} from './typeorm-annotations';

export class TypeORMModule extends Module {
    configure(): void {
        this.registerValue(DataSourceAnnotation, TypeORMDataSource);
        this.registerValue(
            FlagRepositoryAnnotation,
            TypeORMDataSource.getRepository(Flag)
        );
    }
}
