import { Module } from 'noose-injection';
import { FlagTypeORMRepository } from './flag-typeorm-repository';
import { FlagTypeORMRepositoryAnnotation } from './repository-annotations';

export class TypeORMRepositoriesModule extends Module {
    configure(): void {
        this.registerClass(
            FlagTypeORMRepositoryAnnotation,
            FlagTypeORMRepository
        );
    }
}
