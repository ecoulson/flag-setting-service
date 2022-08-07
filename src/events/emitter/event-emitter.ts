import { Injectable } from 'noose-injection';
import { Status } from '../../common/status/status';
import { Event } from '../../models/events/event';
import { EventHandler } from './event-handler';

@Injectable()
export class EventEmitter {
    private readonly listenerMap: Map<string, EventHandler[]>;

    constructor() {
        this.listenerMap = new Map<string, EventHandler[]>();
    }

    emit(event: Event): Status {
        const listeners = this.listenerMap.get(event.type);
        listeners?.forEach((listener) => {
            listener(event);
        });
        return Status.ok();
    }

    addListener(type: string, listener: EventHandler): Status {
        if (this.listenerMap.has(type)) {
            this.listenerMap.get(type)?.push(listener);
        } else {
            this.listenerMap.set(type, [listener]);
        }
        return Status.ok();
    }

    removeListener(type: string, listener: EventHandler): Status {
        const listeners = this.listenerMap.get(type);
        if (listeners) {
            this.listenerMap.set(
                type,
                listeners.filter((existingListener) => {
                    return existingListener !== listener;
                })
            );
            return Status.ok();
        }
        return Status.error();
    }

    removeAllListeners(): Status {
        this.listenerMap.clear();
        return Status.ok();
    }
}
