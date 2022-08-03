import { Optional } from '../common/optional/optional';
import { Broker } from '../database/broker/broker';
import { MissingBroker } from '../database/broker/missing-broker';
import { Logger } from '../logging/logger';
import { Identifiable } from '../models/identifiable';
import { Storage } from './storage';

export abstract class SQLStorage<T extends Identifiable> implements Storage<T> {
    protected readonly broker: Broker<T>;

    constructor(broker: Optional<Broker<T>>, logger: Logger) {
        if (broker.isEmpty()) {
            logger.fatal(
                'This storage class is missing a broker. Check that the data source has all database entities registered with it'
            );
            this.broker = new MissingBroker(logger);
        } else {
            this.broker = broker.get();
        }
    }

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
