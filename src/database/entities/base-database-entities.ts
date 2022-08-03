import { DatabaseEntities } from './database-entities';
import { EntityConstructor } from './entity-constructor';

export class BaseDatabaseEntities implements DatabaseEntities {
    private readonly entities: EntityConstructor[];

    constructor(...entities: EntityConstructor[]) {
        this.entities = entities;
    }

    getAll(): EntityConstructor[] {
        return this.entities;
    }

    hasEntity(entityConstructor: EntityConstructor): boolean {
        return this.entities.includes(entityConstructor);
    }
}
