import { Status } from '../../../common/status/status';

export type Executor = (...args: any[]) => Promise<Status>;
