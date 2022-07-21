import { Module } from 'noose-injection';
import { DatabaseEntitiesAnnotation } from './entities-annotations';
import { TypeORMDatabaseEntities } from './typeorm-database-entities';

export class DatabaseEntitiesModule extends Module {
    configure(): void {
        this.registerClass(DatabaseEntitiesAnnotation, TypeORMDatabaseEntities);
    }
}
