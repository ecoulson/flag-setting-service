import 'reflect-metadata';
import { TypeORMDataSourceAnnotation } from './database/typeorm/typeorm-annotations';
import { MainModule } from './main';
import { Server } from './server/server';
import { FastifyServerAnnotation } from './server/server-annotations';
import { DataSource } from './database/data-source';

async function main() {
    const main = new MainModule();
    main.configure();

    const dataSource = main.resolve<DataSource>(TypeORMDataSourceAnnotation);
    const initialized = await dataSource.initialize();

    if (!initialized) {
        console.log('Failed to initialize connection with data source');
    } else {
        const server = main.resolve<Server>(FastifyServerAnnotation);
        server.listen(8080);
    }
}

main();
