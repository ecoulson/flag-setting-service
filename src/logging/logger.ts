export interface Logger {
    log(message: string): Promise<boolean>;
}
