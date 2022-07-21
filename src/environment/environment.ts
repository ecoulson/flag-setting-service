import { Optional } from '../common/optional/optional';

export interface Environment {
    get(variable: string): Optional<string>;
}
