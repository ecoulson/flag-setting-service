import 'reflect-metadata';
import { TypeORMDataSourceAnnotation } from './database/typeorm/typeorm-annotations';
import { MainModule } from './main';
import { Server } from './server/server';
import { FastifyServerAnnotation } from './server/server-annotations';
import { DataSource } from './database/data-source';
import { LoggerAnnotation } from './logging/logging-annotations';
import { Logger } from './logging/logger';

async function main() {
    const main = new MainModule();
    main.configure();

    const logger = main.resolve<Logger>(LoggerAnnotation);
    const dataSource = main.resolve<DataSource>(TypeORMDataSourceAnnotation);
    const initialized = await dataSource.initialize();

    if (!initialized) {
        logger.fatal('Failed to initialize connection with data source');
    } else {
        const server = main.resolve<Server>(FastifyServerAnnotation);
        server.listen(8080);
    }
}

main();
