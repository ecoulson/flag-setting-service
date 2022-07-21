import { Injectable } from 'noose-injection';
import { Flag } from '../../models/flags/flag';
import { FlagConstructorAnnotation } from '../../models/model-annotation';
import { DatabaseEntities } from './database-entities';
import { EntityConstructor } from './entity-constructor';

@Injectable()
export class TypeORMDatabaseEntities implements DatabaseEntities {
    constructor(
        @FlagConstructorAnnotation.inject() private readonly flag: typeof Flag
    ) {}

    getAll(): EntityConstructor[] {
        return [this.flag];
    }
}
