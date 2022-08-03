export interface MessageIdempotencyService {
    getIdempotentId(eventId: string): Promise<string>;
}
