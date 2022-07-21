import { Injectable } from 'noose-injection';
import { Optional } from '../../common/optional/optional';
import { Environment } from '../../environment/environment';
import { SystemEnvironmentAnnotation } from '../../environment/system/system-annotation';

@Injectable()
export class DatabaseURL {
    private static readonly VARIABLE_NAME = 'DATABASE_URL';

    constructor(
        @SystemEnvironmentAnnotation.inject()
        private readonly environment: Environment
    ) {}

    value(): Optional<string> {
        return this.environment.get(DatabaseURL.VARIABLE_NAME);
    }
}
