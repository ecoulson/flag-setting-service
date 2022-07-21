export interface DataSource {
    initialize(): Promise<boolean>;
}
