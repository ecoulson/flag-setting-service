import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { MainModule } from '.';
import { App } from './app';
import { AppAnnotation } from './app-annotations';
dotenv.config();

const container = new MainModule();
container.configure();

const app = container.resolve<App>(AppAnnotation);
app.start();
