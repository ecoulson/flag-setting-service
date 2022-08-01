import { Module } from 'noose-injection';
import {
    FlagDatabaseAnnotation,
    FlagDatabaseEntitiesAnnotation,
} from './flag-database-annotations';
import { FlagDatabaseEntities } from './flag-database-entities';
import { TypeORMFlagDataSource } from './typeorm-flag-data-source';

export class FlagDatabaseModule extends Module {
    configure(): void {
        this.registerClass(
            FlagDatabaseEntitiesAnnotation,
            FlagDatabaseEntities
        );
        this.registerClass(FlagDatabaseAnnotation, TypeORMFlagDataSource);
    }
}
