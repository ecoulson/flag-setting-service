import { Broker } from '../broker/broker';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Identifiable } from '../../models/identifiable';
import { WhereQuery } from '../broker/where-query';

export class TypeORMBroker<T extends Identifiable> implements Broker<T> {
    constructor(private readonly repository: Repository<T>) {}

    public static fromRepository<T extends Identifiable>(
        repository: Repository<T>
    ): TypeORMBroker<T> {
        return new TypeORMBroker<T>(repository);
    }

    find(): Promise<T[]> {
        return this.repository.find();
    }

    findById(id: string): Promise<T | null> {
        return this.repository.findOne({
            where: {
                id,
            } as FindOptionsWhere<T>,
        });
    }

    findWhere(where: WhereQuery<T>): Promise<T[]> {
        return this.repository.find({
            where: where as FindOptionsWhere<T>,
        });
    }

    findOneWhere(where: WhereQuery<T>): Promise<T | null> {
        return this.repository.findOne({
            where: where as FindOptionsWhere<T>,
        });
    }

    async create(entity: T): Promise<T> {
        const result = await this.repository.insert(entity as any);
        return result.generatedMaps[0] as T;
    }

    async delete(entity: T): Promise<T> {
        await this.repository.delete({
            where: {
                id: entity.id,
            },
        } as any);
        return entity;
    }

    async update(entity: T): Promise<T> {
        const result = await this.repository.update(
            {
                where: {
                    id: entity.id,
                },
            } as any,
            entity as any
        );
        return result.generatedMaps[0] as T;
    }
}
