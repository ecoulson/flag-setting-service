import { FindOptionsWhere, Repository } from 'typeorm';
import { Optional } from '../common/optional/optional';
import { Identifiable } from '../models/identifiable';
import { Storage } from './storage';

export abstract class SQLStorage<T extends Identifiable> implements Storage<T> {
    constructor(protected readonly repository: Repository<T>) {}

    async create(entity: T): Promise<Optional<T>> {
        const existingEntity = await this.findById(entity.id);
        if (existingEntity.isPresent()) {
            return Optional.of();
        }
        return Optional.ofPromise(this.repository.save(entity));
    }

    async delete(entity: T): Promise<Optional<T>> {
        const existingEntity = await this.findById(entity.id);
        if (existingEntity.isEmpty()) {
            return Optional.empty();
        }
        return Optional.ofPromise(this.repository.remove(entity));
    }

    find(): Promise<T[]> {
        return this.repository.find();
    }

    findById(id: string): Promise<Optional<T>> {
        return Optional.ofPromise(
            this.repository.findOne({
                where: {
                    id,
                } as FindOptionsWhere<T>,
            })
        );
    }

    async update(entity: T): Promise<Optional<T>> {
        const existingEntity = await this.findById(entity.id);
        if (existingEntity.isEmpty()) {
            return Optional.of();
        }
        return Optional.ofPromise(this.repository.save(entity));
    }
}
