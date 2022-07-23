import { Optional } from '../common/optional/optional';
import { EnvironmentVariable } from './variable/environment-variable';

export interface Environment {
    get(variable: EnvironmentVariable): Optional<string>;
}
