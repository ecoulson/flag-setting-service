import { Injectable } from 'noose-injection';
import { Optional } from '../../common/optional/optional';
import { Environment } from '../environment';
import { EnvironmentVariable } from '../variable/environment-variable';
import { ProcessEnvironmentAnnotation } from './system-annotation';

@Injectable()
export class SystemEnvironment implements Environment {
    constructor(
        @ProcessEnvironmentAnnotation.inject()
        private readonly processEnvironment: NodeJS.ProcessEnv
    ) {}

    get(variable: EnvironmentVariable): Optional<string> {
        return Optional.of(this.processEnvironment[variable.name()]);
    }
}
