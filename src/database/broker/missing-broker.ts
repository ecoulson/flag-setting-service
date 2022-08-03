import { Logger } from '../../logging/logger';
import { Identifiable } from '../../models/identifiable';
import { Broker } from './broker';
import { WhereQuery } from './where-query';

export class MissingBroker<T extends Identifiable> implements Broker<T> {
    constructor(private readonly logger: Logger) {}

    async find(): Promise<T[]> {
        this.logger.fatal('This broker is missing an implementation');
        return [];
    }

    async findById(id: string): Promise<T | null> {
        this.logger.fatal('This broker is missing an implementation');
        return null;
    }

    async findWhere(where: WhereQuery<T>): Promise<T[]> {
        this.logger.fatal('This broker is missing an implementation');
        return [];
    }

    async create(entity: T): Promise<T | null> {
        this.logger.fatal('This broker is missing an implementation');
        return null;
    }

    async delete(entity: T): Promise<T | null> {
        this.logger.fatal('This broker is missing an implementation');
        return null;
    }

    async update(entity: T): Promise<T | null> {
        this.logger.fatal('This broker is missing an implementation');
        return null;
    }
}
