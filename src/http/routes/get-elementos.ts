import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { db } from '../../db/connection.ts';
import { Emementos } from '../../db/schema/elementos.ts';

export const getElementosRoute: FastifyPluginCallbackZod = (app) => {
    app.get('/elementos', async (request, reply) => {
        // Adiciona o header CORS diretamente na resposta
        reply.header('Access-Control-Allow-Origin', '*');

        const results = await db
            .select({
                id: Emementos.id,
                name: Emementos.name,
                emoje: Emementos.emoje,
                createdAt: Emementos.createdAt,
            })
            .from(Emementos)
            .orderBy(Emementos.createdAt);
        return results;
    });
};
