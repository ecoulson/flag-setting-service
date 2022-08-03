import { Injectable } from 'noose-injection';
import { Flag } from '../../models/flags/flag';
import { FlagConstructorAnnotation } from '../../models/model-annotation';
import { BaseDatabaseEntities } from '../entities/base-database-entities';

@Injectable()
export class FlagDatabaseEntities extends BaseDatabaseEntities {
    constructor(
        @FlagConstructorAnnotation.inject()
        flag: typeof Flag
    ) {
        super(flag);
    }
}
