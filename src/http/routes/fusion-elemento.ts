import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod/v4";
import { db } from "../../db/connection.ts";
import { Emementos } from "../../db/schema/elementos.ts";
import { generateElemento } from "../../services/gemini.ts";
import { checkPrimeSync } from "crypto";

export const fusionElementoRoute: FastifyPluginCallbackZod = (app) => {
    app.post('/fusao', {
        
        schema: {
            body: z.object({
                nomeum: z.string().min(1),
                nomedois: z.string().min(1),
               
            }),
        }
    },
        async (request, reply) => {
            reply.header('Access-Control-Allow-Origin', '*');
            const { nomeum, nomedois } = request.body;
             console.log("Requisição recebida:", request.body);
            const fusao = await generateElemento(nomeum, nomedois);
            
            const limpo = fusao.replace(/```json|```/g, "").trim();
            const resultado = JSON.parse(limpo);

            const name = resultado.name
            const emoje = resultado.emoji

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