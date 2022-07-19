import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Flag {
    @PrimaryColumn()
    public id: string;
    @Column()
    public name: string;
    @Column()
    public defaultValue: boolean;

    constructor(id: string, name: string, defaultValue: boolean) {
        this.name = name;
        this.id = id;
        this.defaultValue = defaultValue;
    }
}
