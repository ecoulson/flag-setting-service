import { Injectable } from 'noose-injection';
import { Optional } from '../../common/optional/optional';
import {
    ProcessEnvironmentAnnotation,
    SystemEnvironmentAnnotation,
} from './system-annotation';

@Injectable()
export class SystemEnvironment {
    constructor(
        @ProcessEnvironmentAnnotation.inject()
        private readonly processEnvironment: NodeJS.ProcessEnv
    ) {}

    get(variable: string): Optional<string> {
        return Optional.of(this.processEnvironment[variable]);
    }
}
