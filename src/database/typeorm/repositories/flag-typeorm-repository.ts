import { Injectable } from 'noose-injection';
import { Repository as TypeORMRepository } from 'typeorm';
import { Flag } from '../../../models/flags/flag';
import { TypeORMDataSourceAnnotation } from '../typeorm-annotations';
import { TypeORMDataSource } from '../typeorm-data-source';

@Injectable()
export class FlagTypeORMRepository {
    constructor(
        @TypeORMDataSourceAnnotation.inject()
        private readonly dataSource: TypeORMDataSource
    ) {}

    get(): TypeORMRepository<Flag> {
        return this.dataSource.getRepository(Flag);
    }
}
