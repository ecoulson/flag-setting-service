import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Message<T = unknown> {
    @PrimaryColumn()
    public id: string;
    @Column()
    public topic: string;
    @Column()
    public data: T;

    constructor(id: string, topic: string, data: T) {
        this.id = id;
        this.topic = topic;
        this.data = data;
    }
}
