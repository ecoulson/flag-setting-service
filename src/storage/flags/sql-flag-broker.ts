import { Injectable } from 'noose-injection';
import { Repository } from 'typeorm';
import { Optional } from '../../common/optional/optional';
import { FlagRepositoryAnnotation } from '../../database/typeorm/typeorm-annotations';
import { StorageBroker } from '../storage-broker';
import { Flag } from '../../models/flags/flag';

@Injectable()
export class SQLFlagBroker implements StorageBroker<Flag> {
    constructor(
        @FlagRepositoryAnnotation.inject()
        private readonly repository: Repository<Flag>
    ) {}

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
