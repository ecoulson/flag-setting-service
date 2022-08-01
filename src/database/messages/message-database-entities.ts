import { Injectable } from 'noose-injection';
import { Message } from '../../models/messages/message';
import { MessageConstructorAnnotation } from '../../models/model-annotation';
import { DatabaseEntities } from '../entities/database-entities';
import { EntityConstructor } from '../entities/entity-constructor';

@Injectable()
export class MessageDatabaseEntities implements DatabaseEntities {
    constructor(
        @MessageConstructorAnnotation.inject()
        private readonly message: typeof Message
    ) {}

    getAll(): EntityConstructor[] {
        return [this.message];
    }

    hasEntity(entityConstructor: EntityConstructor): boolean {
        return this.getAll().includes(entityConstructor);
    }
}
