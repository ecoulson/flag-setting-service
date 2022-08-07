import { EnvironmentVariable } from '../environment/variable/environment-variable';
import { EntityConstructor } from './entities/entity-constructor';
import { Broker } from './broker/broker';
import { Identifiable } from '../models/identifiable';
import { Optional } from '../common/optional/optional';
import { Status } from '../common/status/status';

export interface DataSource {
    initialize(databaseURL: EnvironmentVariable): Promise<Status>;
    getBroker<T extends Identifiable>(
        entity: EntityConstructor
    ): Optional<Broker<T>>;
}
