import { Injectable } from 'noose-injection';
import { Storage } from '../storage';
import { Flag } from '../../models/flags/flag';
import { SQLStorage } from '../sql-storage';
import { FlagDatabaseAnnotation } from '../../database/flags/flag-database-annotations';
import { FlagDataSource } from '../../database/flags/flag-data-source';
import { LoggerAnnotation } from '../../logging/logging-annotations';
import { Logger } from '../../logging/logger';

@Injectable()
export class SQLFlagStorage extends SQLStorage<Flag> implements Storage<Flag> {
    constructor(
        @FlagDatabaseAnnotation.inject()
        dataSource: FlagDataSource,
        @LoggerAnnotation.inject()
        logger: Logger
    ) {
        super(dataSource.getFlagBroker(), logger);
    }
}
