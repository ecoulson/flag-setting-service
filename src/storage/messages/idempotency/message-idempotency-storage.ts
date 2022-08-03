import { Optional } from '../../../common/optional/optional';
import { MessageIdempotencyMapping } from '../../../models/messages/message-idempotency-mapping';
import { Storage } from '../../storage';

export interface MessageIdempotencyStorage
    extends Storage<MessageIdempotencyMapping> {
    findMappingByIdempotentId(
        idempotentId: string
    ): Promise<Optional<MessageIdempotencyMapping>>;
}
