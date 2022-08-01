import { EntityConstructor } from './entity-constructor';

export interface DatabaseEntities {
    getAll(): EntityConstructor[];
    hasEntity(entityConstructor: EntityConstructor): boolean;
}
