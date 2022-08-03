import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class MessageIdempotencyMapping {
    @PrimaryColumn()
    public eventId: string;
    @Column()
    public messageId: string;

    constructor(eventId: string, messageId: string) {
        this.eventId = eventId;
        this.messageId = messageId;
    }
}
