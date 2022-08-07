import { Injectable } from 'noose-injection';
import { Status } from '../../../common/status/status';
import { Time } from '../../../models/time/time';
import { Executor } from './executor';

@Injectable()
export class ScheduledExecutor {
    executeAfter(handler: Executor, delay: Time): Promise<Status> {
        return new Promise((resolve) => {
            setTimeout(async () => {
                try {
                    const status = await handler();
                    resolve(status);
                } catch (error) {
                    resolve(Status.error(error as Error));
                }
            }, delay.toMiliseconds());
        });
    }
}
