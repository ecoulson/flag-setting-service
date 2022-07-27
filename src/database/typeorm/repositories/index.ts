import { Module } from 'noose-injection';
import { FlagTypeORMRepository } from './flag-typeorm-repository';
import { MessageTypeORMRepository } from './message-typeorm-repository';
import {
    FlagTypeORMRepositoryAnnotation,
    MessageTypeORMRepositoryAnnotation,
} from './repository-annotations';

export class TypeORMRepositoriesModule extends Module {
    configure(): void {
        this.registerClass(
            FlagTypeORMRepositoryAnnotation,
            FlagTypeORMRepository
        );
        this.registerClass(
            MessageTypeORMRepositoryAnnotation,
            MessageTypeORMRepository
        );
    }
}
