import { Injectable } from 'noose-injection';
import { Message } from '../../models/messages/message';
import { MessageIdempotencyMapping } from '../../models/messages/message-idempotency-mapping';
import {
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
        messageIdempotencyMapping: typeof MessageIdempotencyMapping
    ) {
        super(message, messageIdempotencyMapping);
    }
}
