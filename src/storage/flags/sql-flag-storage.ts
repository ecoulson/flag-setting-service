import * as dotenv from 'dotenv';
dotenv.config();
import { Injectable } from 'noose-injection';
import { Optional } from '../../common/optional/optional';
import { Storage } from '../storage';
import { Flag } from '../../models/flags/flag';
import { FlagTypeORMRepositoryAnnotation } from '../../database/typeorm/repositories/repository-annotations';
import { FlagTypeORMRepository } from '../../database/typeorm/repositories/flag-typeorm-repository';
import { Repository } from 'typeorm';

@Injectable()
export class SQLFlagStorage implements Storage<Flag> {
    private readonly repository: Repository<Flag>;

    constructor(
        @FlagTypeORMRepositoryAnnotation.inject()
        repositoryContainer: FlagTypeORMRepository
    ) {
        this.repository = repositoryContainer.get();
    }

    async create(flag: Flag): Promise<Optional<Flag>> {
        const existingFlag = await this.findById(flag.id);
        if (existingFlag.isPresent()) {
            return Optional.empty();
        }
        return Optional.ofPromise(this.repository.save(flag));
    }

    async delete(flag: Flag): Promise<Optional<Flag>> {
        const existingFlag = await this.findById(flag.id);
        if (existingFlag.isEmpty()) {
            return Optional.empty();
        }
        return Optional.ofPromise(this.repository.remove(flag));
    }

    find(): Promise<Flag[]> {
        return this.repository.find();
    }

    findById(id: string): Promise<Optional<Flag>> {
        return Optional.ofPromise(
            this.repository.findOne({
                where: {
                    id,
                },
            })
        );
    }

    async update(flag: Flag): Promise<Optional<Flag>> {
        const existingFlag = await this.findById(flag.id);
        if (existingFlag.isEmpty()) {
            return Optional.empty();
        }
        return Optional.ofPromise(this.repository.save(flag));
    }
}
