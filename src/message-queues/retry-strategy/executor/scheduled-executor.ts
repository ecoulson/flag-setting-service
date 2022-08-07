import { Injectable } from 'noose-injection';
import { Status } from '../../../common/status/status';
import { Time } from '../../../models/time/time';
import { Executor } from './executor';

@Injectable()
export class ScheduledExecutor {
    executeAfter(handler: Executor, delay: Time): Promise<Status> {
        return new Promise((resolve) => {
            setTimeout(() => {
                try {
                    handler();
                    resolve(Status.ok());
                } catch (error) {
                    resolve(Status.error(error as Error));
                }
            }, delay.toMiliseconds());
        });
    }
}
