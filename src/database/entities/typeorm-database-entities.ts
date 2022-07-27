import { Injectable } from 'noose-injection';
import { Flag } from '../../models/flags/flag';
import { Message } from '../../models/messages/message';
import {
    FlagConstructorAnnotation,
    MessageConstructorAnnotation,
} from '../../models/model-annotation';
import { DatabaseEntities } from './database-entities';
import { EntityConstructor } from './entity-constructor';

@Injectable()
export class TypeORMDatabaseEntities implements DatabaseEntities {
    constructor(
        @FlagConstructorAnnotation.inject() private readonly flag: typeof Flag,
        @MessageConstructorAnnotation.inject()
        private readonly message: typeof Message
    ) {}

    getAll(): EntityConstructor[] {
        return [this.flag, this.message];
    }
}
