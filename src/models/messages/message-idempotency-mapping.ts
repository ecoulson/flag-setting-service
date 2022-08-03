import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class MessageIdempotencyMapping {
    @PrimaryColumn()
    public id: string; // coresponds to event id
    @Column()
    public idempotentId: string;

    constructor(id: string, idempotentId: string) {
        this.id = id;
        this.idempotentId = idempotentId;
    }
}
