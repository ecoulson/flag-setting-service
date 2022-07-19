import 'reflect-metadata';
import { MainModule } from './main';
import { Server } from './server/server';
import { FastifyServerAnnotation } from './server/server-annotations';

const main = new MainModule();
main.configure();

const server = main.resolve<Server>(FastifyServerAnnotation);

server.listen(8080);
