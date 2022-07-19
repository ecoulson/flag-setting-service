import 'reflect-metadata';
import { DataSourceAnnotation } from './database/typeorm/typeorm-annotations';
import { MainModule } from './main';
import { Server } from './server/server';
import { FastifyServerAnnotation } from './server/server-annotations';
import { DataSource } from './database/data-source';
import { StorageBroker } from './storage/storage-broker';
import { Flag } from './models/flags/flag';
import { FlagStorageAnnotation } from './storage/flags/flag-broker-annotation';

async function main() {
    const main = new MainModule();
    main.configure();

    const dataSource = main.resolve<DataSource>(DataSourceAnnotation);
    await dataSource.initialize();

    const flagStorge = main.resolve<StorageBroker<Flag>>(FlagStorageAnnotation);
    const flag = new Flag('1', 'name', false);
    console.log(await flagStorge.delete(flag));
    console.log(await flagStorge.delete(flag));

    const server = main.resolve<Server>(FastifyServerAnnotation);
    server.listen(8080);
}

main();
