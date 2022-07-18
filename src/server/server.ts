import { FastifyInstance } from 'fastify'

export class Server {
    constructor(private readonly fastify: FastifyInstance) {}

    async start(port: number) {
        this.fastify.listen({
            port: 0,
        })
    }
}
