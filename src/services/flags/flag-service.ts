import { Injectable } from 'noose-injection';
import { Optional } from '../../common/optional/optional';
import { Logger } from '../../logging/logger';
import { LoggerAnnotation } from '../../logging/logging-annotations';
import { Flag } from '../../models/flags/flag';
import { FlagStorageAnnotation } from '../../storage/flags/flag-storage-annotations';
import { Storage } from '../../storage/storage';

@Injectable()
export class FlagService {
    constructor(
        @FlagStorageAnnotation.inject()
        private readonly storage: Storage<Flag>,
        @LoggerAnnotation.inject()
        private readonly logger: Logger
    ) {}

    async getFlag(id: string): Promise<Optional<Flag>> {
        const flag = await this.storage.findById(id);
        if (flag.isEmpty()) {
            this.logger.error(`Failed to find flag(id=${id}) in storage.`);
        }
        return flag;
    }
}
