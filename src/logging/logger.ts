import { Status } from '../common/status/status';

export interface Logger {
    fatal(message: string): Promise<Status>;
    error(message: string): Promise<Status>;
    warn(message: string): Promise<Status>;
    info(message: string): Promise<Status>;
    debug(message: string): Promise<Status>;
}
