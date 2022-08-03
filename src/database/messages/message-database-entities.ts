import { Injectable } from 'noose-injection';
import { Message } from '../../models/messages/message';
import { MessageConstructorAnnotation } from '../../models/model-annotation';
import { BaseDatabaseEntities } from '../entities/base-database-entities';

@Injectable()
export class MessageDatabaseEntities extends BaseDatabaseEntities {
    constructor(
        @MessageConstructorAnnotation.inject()
        message: typeof Message
    ) {
        super(message);
    }
}
