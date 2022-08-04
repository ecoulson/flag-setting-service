import { MessageIdempotencyStorage } from '../../../storage/messages/idempotency/message-idempotency-storage';
import { MessageIdempotencyService } from './message-idempotency-service';

export class StoredMessageIdempotencyService
    implements MessageIdempotencyService
{
    getIdempotentId(eventId: string): Promise<string> {
        throw new Error('Method not implemented.');
    }
}
