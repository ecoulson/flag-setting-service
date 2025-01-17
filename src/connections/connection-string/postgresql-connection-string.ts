import { Injectable } from 'noose-injection';
import { Optional } from '../../common/optional/optional';
import { Environment } from '../../environment/environment';
import { SystemEnvironmentAnnotation } from '../../environment/system/system-annotation';
import { EnvironmentVariable } from '../../environment/variable/environment-variable';
import { ConnectionParameters } from './connection-parameters';
import { ConnectionString } from './connection-string';

@Injectable()
export class PostgreSQLConnectionString implements ConnectionString {
    constructor(
        @SystemEnvironmentAnnotation.inject()
        private readonly environment: Environment
    ) {}

    parse(
        databaseURLVariable: EnvironmentVariable
    ): Optional<ConnectionParameters> {
        const databaseURL = this.environment.get(databaseURLVariable);
        if (databaseURL.isEmpty()) {
            return Optional.empty();
        }
        let remainingURL = databaseURL.get().replace('postgres://', '');
        const usernameEndIndex = remainingURL.indexOf(':');
        const username = remainingURL.substring(0, usernameEndIndex);
        remainingURL = remainingURL.substring(usernameEndIndex + 1);

        const passwordEndIndex = remainingURL.indexOf('@');
        const password = remainingURL.substring(0, passwordEndIndex);
        remainingURL = remainingURL.substring(passwordEndIndex + 1);

        const hostEndIndex = remainingURL.indexOf(':');
        const host = remainingURL.substring(0, hostEndIndex);
        remainingURL = remainingURL.substring(hostEndIndex + 1);

        const portEndIndex = remainingURL.indexOf('/');
        const port = parseInt(remainingURL.substring(0, portEndIndex));
        remainingURL = remainingURL.substring(portEndIndex + 1);

        const database = remainingURL;

        return Optional.of({
            database,
            host,
            password,
            port,
            username,
        });
    }
}
