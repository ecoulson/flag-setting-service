export interface MessageQueueConnectionStrategy {
    initialize(): Promise<void>;
}
