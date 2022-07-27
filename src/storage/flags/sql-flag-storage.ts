import * as dotenv from 'dotenv';
dotenv.config();
import { Injectable } from 'noose-injection';
import { Storage } from '../storage';
import { Flag } from '../../models/flags/flag';
import { FlagTypeORMRepositoryAnnotation } from '../../database/typeorm/repositories/repository-annotations';
import { FlagTypeORMRepository } from '../../database/typeorm/repositories/flag-typeorm-repository';
import { SQLStorage } from '../sql-storage';

@Injectable()
export class SQLFlagStorage extends SQLStorage<Flag> implements Storage<Flag> {
    constructor(
        @FlagTypeORMRepositoryAnnotation.inject()
        repositoryContainer: FlagTypeORMRepository
    ) {
        super(repositoryContainer.get());
    }
}
