import { EntityConstructor } from './entity-constructor';

export interface DatabaseEntities {
    getAll(): EntityConstructor[];
}
