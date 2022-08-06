export interface MessageQueueIdempotency {
    getIdempotentId(eventId: string): Promise<string>;
}
