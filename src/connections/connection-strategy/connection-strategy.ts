import { Status } from '../../common/status/status';

export interface ConnectionStrategy {
    initialize(): Promise<Status>;
}
