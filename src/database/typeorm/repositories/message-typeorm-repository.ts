import { Injectable } from 'noose-injection';
import { Repository as TypeORMRepository } from 'typeorm';
import { Message } from '../../../models/messages/message';
import { TypeORMDataSourceAnnotation } from '../typeorm-annotations';
import { TypeORMDataSource } from '../typeorm-data-source';

@Injectable()
export class MessageTypeORMRepository {
    constructor(
        @TypeORMDataSourceAnnotation.inject()
        private readonly dataSource: TypeORMDataSource
    ) {}

    get(): TypeORMRepository<Message> {
        return this.dataSource.getRepository(Message);
    }
}
