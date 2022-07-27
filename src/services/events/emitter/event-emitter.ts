import { Event } from '../../../models/events/event';
import { EventHandler } from './event-handler';

export class EventEmitter {
    emit(event: Event): void {
        throw new Error();
    }

    listen(type: string, listener: EventHandler) {
        throw new Error();
    }
}
