import { Module } from 'noose-injection';
import { Flag } from './flags/flag';
import { FlagConstructorAnnotation } from './model-annotation';

export class ModelModule extends Module {
    configure(): void {
        this.registerValue(FlagConstructorAnnotation, Flag);
    }
}
