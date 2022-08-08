import { Optional } from '../../common/optional/optional';
import { EnvironmentVariable } from '../../environment/variable/environment-variable';
import { ConnectionParameters } from './connection-parameters';

export interface ConnectionString {
    parse(databaseURL: EnvironmentVariable): Optional<ConnectionParameters>;
}
