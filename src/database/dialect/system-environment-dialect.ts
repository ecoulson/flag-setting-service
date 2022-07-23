import { Injectable } from 'noose-injection';
import { Environment } from '../../environment/environment';
import { SystemEnvironmentAnnotation } from '../../environment/system/system-annotation';
import { EnvironmentVariable } from '../../environment/variable/environment-variable';
import { DialectVariableAnnotation } from '../../environment/variable/environment-variable-annotations';
import { Dialect } from './dialect';
import { DialectType } from './dialect-type';

@Injectable()
export class SystemEnvironmentDialect implements Dialect {
    constructor(
        @SystemEnvironmentAnnotation.inject()
        private readonly systemEnvironment: Environment,
        @DialectVariableAnnotation.inject()
        private readonly dialect: EnvironmentVariable
    ) {}

    type(): DialectType {
        const type = this.systemEnvironment.get(this.dialect);
        if (type.isEmpty()) {
            return DialectType.UNKNOWN;
        }
        switch (type.get()) {
            case DialectType.POSTGRESQL:
                return DialectType.POSTGRESQL;
            default:
                return DialectType.UNKNOWN;
        }
    }
}
