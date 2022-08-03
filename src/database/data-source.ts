import { EnvironmentVariable } from '../environment/variable/environment-variable';
import { EntityConstructor } from './entities/entity-constructor';
import { Broker } from './broker/broker';
import { Identifiable } from '../models/identifiable';
import { Optional } from '../common/optional/optional';

export interface DataSource {
    initialize(databaseURL: EnvironmentVariable): Promise<boolean>;
    getBroker<T extends Identifiable>(
        entity: EntityConstructor
    ): Optional<Broker<T>>;
}
