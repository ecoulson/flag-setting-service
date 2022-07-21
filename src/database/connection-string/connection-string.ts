import { Optional } from '../../common/optional/optional';
import { ConnectionParameters } from './connection-parameters';

export interface ConnectionString {
    parse(): Optional<ConnectionParameters>;
}
