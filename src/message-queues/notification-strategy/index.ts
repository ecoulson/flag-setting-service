import { Module } from 'noose-injection';
import { LocalNotificationStrategy } from './local-notification-strategy';
import { LocalNotificationStrategyAnnotation } from './notification-strategy-annotation';

export class NotificationStrategyModule extends Module {
    configure(): void {
        this.registerClass(
            LocalNotificationStrategyAnnotation,
            LocalNotificationStrategy
        );
    }
}
