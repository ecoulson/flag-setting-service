export interface Logger {
    fatal(message: string): Promise<boolean>;
    error(message: string): Promise<boolean>;
    warn(message: string): Promise<boolean>;
    info(message: string): Promise<boolean>;
    debug(message: string): Promise<boolean>;
}
