import { WhereQuery } from './where-query';

export interface Broker<T> {
    find(): Promise<T[]>;
    findById(id: string): Promise<T | null>;
    findWhere(where: WhereQuery<T>): Promise<T[]>;
    findOneWhere(where: WhereQuery<T>): Promise<T | null>;
    create(entity: T): Promise<T | null>;
    delete(entity: T): Promise<T | null>;
    update(entity: T): Promise<T | null>;
}
