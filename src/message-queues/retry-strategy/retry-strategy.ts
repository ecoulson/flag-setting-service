import { Status } from '../../common/status/status';
import { Executor } from './executor/executor';

export interface RetryStrategy {
    execute(executor: Executor): Promise<Status>;
}
