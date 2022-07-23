import { Module } from 'noose-injection';
import { FlagServiceAnnotation } from './flag-annotations';
import { FlagService } from './flag-service';

export class FlagServiceModule extends Module {
    configure(): void {
        this.registerClass(FlagServiceAnnotation, FlagService);
    }
}
