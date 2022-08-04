import { Injectable } from 'noose-injection';
import { MessageIdempotencyMapping } from '../../../models/messages/message-idempotency-mapping';
import { MessageIdempotencyStorage } from '../../../storage/messages/idempotency/message-idempotency-storage';
import { MessageIdempotencyStorageAnnotation } from '../../../storage/messages/idempotency/message-idempotency-storage-annotations';
import { UUIDIdentifierServiceAnnotation } from '../../identifier/identifier-annotations';
import { IdentifierService } from '../../identifier/identifier-service';
import { MessageIdempotencyService } from './message-idempotency-service';

@Injectable()
export class StoredMessageIdempotencyService
    implements MessageIdempotencyService
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
