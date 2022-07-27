import { Message } from '../../models/messages/message';
import { MessageConstructorAnnotation } from '../../models/model-annotation';
import { DatabaseEntities } from './database-entities';
import { EntityConstructor } from './entity-constructor';

export class MessageDatabaseEntities implements DatabaseEntities {
    constructor(
        @MessageConstructorAnnotation.inject()
        private readonly message: typeof Message
    ) {}

    getAll(): EntityConstructor[] {
        return [this.message];
    }
}
