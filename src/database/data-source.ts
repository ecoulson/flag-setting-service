import { EnvironmentVariable } from '../environment/variable/environment-variable';

export interface DataSource {
    initialize(databaseURL: EnvironmentVariable): Promise<boolean>;
}
