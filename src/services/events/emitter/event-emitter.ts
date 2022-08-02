import { Injectable } from 'noose-injection';
import { Event } from '../../../models/events/event';
import { EventHandler } from './event-handler';

@Injectable()
export class EventEmitter {
    private readonly listenerMap: Map<string, EventHandler[]>;

    constructor() {
        this.listenerMap = new Map<string, EventHandler[]>();
    }

    emit(event: Event): void {
        const listeners = this.listenerMap.get(event.type);
        listeners?.forEach((listener) => {
            listener(event);
        });
    }

    addListener(type: string, listener: EventHandler): boolean {
        if (this.listenerMap.has(type)) {
            this.listenerMap.get(type)?.push(listener);
        } else {
            this.listenerMap.set(type, [listener]);
        }
        return true;
    }

    removeListener(type: string, listener: EventHandler): boolean {
        const listeners = this.listenerMap.get(type);
        if (listeners) {
            this.listenerMap.set(
                type,
                listeners.filter((existingListener) => {
                    return existingListener !== listener;
                })
            );
            return true;
        }
        return false;
    }
}
