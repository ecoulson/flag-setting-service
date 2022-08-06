import { Injectable } from 'noose-injection';
import { MessageIdempotencyMapping } from '../../models/messages/message-idempotency-mapping';
import { MessageIdempotencyStorage } from '../../storage/messages/idempotency/message-idempotency-storage';
import { MessageIdempotencyStorageAnnotation } from '../../storage/messages/idempotency/message-idempotency-storage-annotations';
import { UUIDIdentifierServiceAnnotation } from '../../services/identifier/identifier-annotations';
import { IdentifierService } from '../../services/identifier/identifier-service';
import { MessageQueueIdempotency } from './message-queue-idempotency';

@Injectable()
export class LocalMessageQueueIdempotencyService
    implements MessageQueueIdempotency
{
    constructor(
        @MessageIdempotencyStorageAnnotation.inject()
        private readonly storage: MessageIdempotencyStorage,
        @UUIDIdentifierServiceAnnotation.inject()
        private readonly idService: IdentifierService
    ) {}

    async getIdempotentId(eventId: string): Promise<string> {
        const existingMapping = await this.storage.findById(eventId);
        if (existingMapping.isEmpty()) {
            const newMapping = await this.storage.create(
                new MessageIdempotencyMapping(
                    eventId,
                    this.idService.generateId()
                )
            );
            return newMapping.get().idempotentId;
        }
        return existingMapping.get().idempotentId;
    }
}
