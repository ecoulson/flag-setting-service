import { Module } from 'noose-injection';
import { FastifyServer } from './fastify-server';
import {
    FastifyInstanceAnnotation,
    FastifyServerAnnotation,
} from './server-annotations';
import fastify from 'fastify';

export class ServerModule extends Module {
    configure(): void {
        this.registerValue(
            FastifyInstanceAnnotation,
            fastify({ logger: true })
        );
        this.registerClass(FastifyServerAnnotation, FastifyServer);
    }
}
