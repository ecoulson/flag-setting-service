import { Injectable } from 'noose-injection';
import { Event } from '../../../models/events/event';
import { Message } from '../../../models/messages/message';
import { EventEmitter } from '../../events/emitter/event-emitter';
import { EventEmitterAnnotation } from '../../events/emitter/event-emitter-annotations';
import { UUIDIdentifierServiceAnnotation } from '../../identifier/identifier-annotations';
import { IdentifierService } from '../../identifier/identifier-service';
import { MessageIdempotencyService } from '../idempotency/message-idempotency-service';
import { MessageIdempotencyServiceAnnotation } from '../idempotency/message-idempotency-service-annotations';
import { MessageHandler } from '../message-handler';
import { MessageQueueService } from '../message-queue-service';

@Injectable()
export class LocalMessageQueueService implements MessageQueueService {
    constructor(
        @EventEmitterAnnotation.inject()
        private readonly eventEmitter: EventEmitter,
        @UUIDIdentifierServiceAnnotation.inject()
        private readonly identifierService: IdentifierService,
        @MessageIdempotencyServiceAnnotation.inject()
        private readonly idempotencyService: MessageIdempotencyService
    ) {}

    async subscribe(topic: string, handler: MessageHandler): Promise<boolean> {
        return this.eventEmitter.addListener(topic, async (event) => {
            handler(
                new Message(
                    await this.idempotencyService.getIdempotentId(event.id),
                    event.type,
                    event.data
                )
            );
        });
    }

    async publish(message: Message): Promise<boolean> {
        const eventId = this.identifierService.generateId();
        this.eventEmitter.emit(new Event(eventId, message.topic, message.data));
        return true;
    }
}
