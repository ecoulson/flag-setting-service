import { FastifyInstance } from 'fastify';
import { Server } from './server';
import { FastifyInstanceAnnotation } from './server-annotations';
import { Injectable } from 'noose-injection';

@Injectable()
export class FastifyServer implements Server {
    constructor(
        @FastifyInstanceAnnotation.inject()
        private readonly fastify: FastifyInstance
    ) {}

    async listen(port: number) {
        this.fastify.listen({ port });
    }
}
