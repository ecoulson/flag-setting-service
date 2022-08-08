import { Injectable } from 'noose-injection';
import { DroppedMessage } from '../../models/messages/dropped-message';
import { Message } from '../../models/messages/message';
import { MessageIdempotencyMapping } from '../../models/messages/message-idempotency-mapping';
import {
    DroppedMessageAnnotation,
    MessageConstructorAnnotation,
    MessageIdempotencyMappingAnnotation,
} from '../../models/model-annotation';
import { BaseDatabaseEntities } from '../entities/base-database-entities';

@Injectable()
export class MessageDatabaseEntities extends BaseDatabaseEntities {
    constructor(
        @MessageConstructorAnnotation.inject()
        message: typeof Message,
        @MessageIdempotencyMappingAnnotation.inject()
        messageIdempotencyMapping: typeof MessageIdempotencyMapping,
        @DroppedMessageAnnotation.inject()
        droppedMessage: typeof DroppedMessage
    ) {
        super(message, messageIdempotencyMapping, droppedMessage);
    }
}
