import { Optional } from '../../common/optional/optional';
import { Flag } from '../../models/flags/flag';
import { Broker } from '../broker/broker';
import { DataSource } from '../data-source';

export interface FlagDataSource extends DataSource {
    getFlagBroker(): Optional<Broker<Flag>>;
}
