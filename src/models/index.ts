import { Module } from 'noose-injection';
import { Flag } from './flags/flag';
import { Message } from './messages/message';
import {
    FlagConstructorAnnotation,
    MessageConstructorAnnotation,
} from './model-annotation';

export class ModelModule extends Module {
    configure(): void {
        this.registerValue(FlagConstructorAnnotation, Flag);
        this.registerValue(MessageConstructorAnnotation, Message);
    }
}
