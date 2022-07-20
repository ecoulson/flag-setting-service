import { Module } from 'noose-injection';
import {
    ProcessEnvironmentAnnotation,
    SystemEnvironmentAnnotation,
} from './system-annotation';
import { SystemEnvironment } from './system-environment';

export class SystemEnvironmentModule extends Module {
    configure(): void {
        this.registerValue(ProcessEnvironmentAnnotation, process.env);
        this.registerClass(SystemEnvironmentAnnotation, SystemEnvironment);
    }
}
