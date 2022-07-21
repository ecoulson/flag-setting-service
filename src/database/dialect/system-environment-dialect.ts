import { Injectable } from 'noose-injection';
import { SystemEnvironmentAnnotation } from '../../environment/system/system-annotation';
import { SystemEnvironment } from '../../environment/system/system-environment';
import { Dialect } from './dialect';
import { DialectType } from './dialect-type';

@Injectable()
export class SystemEnvironmentDialect implements Dialect {
    private static readonly VARIABLE_NAME = 'DATABASE_DIALECT';

    constructor(
        @SystemEnvironmentAnnotation.inject()
        private readonly systemEnvironment: SystemEnvironment
    ) {}

    type(): DialectType {
        const type = this.systemEnvironment.get(
            SystemEnvironmentDialect.VARIABLE_NAME
        );
        if (type.isEmpty()) {
            return DialectType.UNKNOWN;
        }
        return type.get() as DialectType;
    }
}
