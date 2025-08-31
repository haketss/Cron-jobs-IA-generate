
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod/v4";
import { db } from "../../db/connection.ts";
import { Emementos } from "../../db/schema/elementos.ts";

export const createElementoRoute: FastifyPluginCallbackZod = (app) => {
    app.post('/elementos', {
        schema: {
            body: z.object({
                name: z.string().min(1),
                emoje: z.string().optional(),
            }),
        }
    },
        async (request, reply) => {
            const { name, emoje } = request.body;
            
            const result = await db.insert(Emementos).values({
                name,
                emoje,
            }).returning();

            const insertedElemento = result[0];

            if (!insertedElemento) {
                throw new Error("failed to create new elemento.");
            }

            return reply.status(201).send({ elementoId: insertedElemento.id });
        }
    );
};