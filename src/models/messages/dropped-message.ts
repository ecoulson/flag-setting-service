import { Column } from 'typeorm';
import { Message } from './message';

export class DroppedMessage<T = unknown> extends Message<T> {
    @Column()
    public subscriberId: string;

    constructor(id: string, topic: string, subscriberId: string, data: T) {
        super(id, topic, data);
        this.subscriberId = subscriberId;
    }
}
