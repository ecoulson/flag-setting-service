import { Injectable } from 'noose-injection';
import { Optional } from '../../common/optional/optional';
import { SystemEnvironmentAnnotation } from '../../environment/system/system-annotation';
import { SystemEnvironment } from '../../environment/system/system-environment';

@Injectable()
export class DatabaseURL {
    private static readonly VARIABLE_NAME = 'DATABASE_URL';

    constructor(
        @SystemEnvironmentAnnotation.inject()
        private readonly environment: SystemEnvironment
    ) {}

    value(): Optional<string> {
        return this.environment.get(DatabaseURL.VARIABLE_NAME);
    }
}
