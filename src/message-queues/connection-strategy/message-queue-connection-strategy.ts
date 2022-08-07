import { Status } from '../../common/status/status';

export interface MessageQueueConnectionStrategy {
    initialize(): Promise<Status>;
}
