import { Injectable } from 'noose-injection';
import { Flag } from '../../models/flags/flag';
import { FlagConstructorAnnotation } from '../../models/model-annotation';
import { DatabaseEntities } from '../entities/database-entities';
import { EntityConstructor } from '../entities/entity-constructor';

@Injectable()
export class FlagDatabaseEntities implements DatabaseEntities {
    constructor(
        @FlagConstructorAnnotation.inject()
        private readonly flag: typeof Flag
    ) {}

    getAll(): EntityConstructor[] {
        return [this.flag];
    }

    hasEntity(entityConstructor: EntityConstructor): boolean {
        return this.getAll().includes(entityConstructor);
    }
}
