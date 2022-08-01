import { FindOptionsWhere, Repository } from 'typeorm';
import { Optional } from '../common/optional/optional';
import { Broker } from '../database/broker/broker';
import { Identifiable } from '../models/identifiable';
import { Storage } from './storage';

export abstract class SQLStorage<T extends Identifiable> implements Storage<T> {
    constructor(protected readonly broker: Broker<T>) {}

    async create(entity: T): Promise<Optional<T>> {
        return Optional.ofPromise(this.broker.create(entity));
    }

    async delete(entity: T): Promise<Optional<T>> {
        return Optional.ofPromise(this.broker.delete(entity));
    }

    find(): Promise<T[]> {
        return this.broker.find();
    }

    findById(id: string): Promise<Optional<T>> {
        return Optional.ofPromise(this.broker.findById(id));
    }

    async update(entity: T): Promise<Optional<T>> {
        return Optional.ofPromise(this.broker.update(entity));
    }
}
