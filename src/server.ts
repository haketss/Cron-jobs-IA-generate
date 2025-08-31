import { fastifyCors } from '@fastify/cors';
import { fastifyMultipart } from '@fastify/multipart';
import { fastify } from 'fastify';
import { serializerCompiler, validatorCompiler, type ZodTypeProvider} from 'fastify-type-provider-zod';

import { env } from './env.ts';
import { getElementosRoute } from './http/routes/get-elementos.ts';
import { createElementoRoute } from './http/routes/create-elemento.ts';
import { fusionElementoRoute } from './http/routes/fusion-elemento.ts';


const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
    origin: 'http://localhost:5173',
});

app.register(fastifyMultipart);
app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'Elementos API',
            description: 'API for elementos',
            version: '1.0.0',
        },
    },
});
app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get('/health', () => {
    return 'ok';
});
app.register(getElementosRoute);
app.register(createElementoRoute);
app.register(fusionElementoRoute);

import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

import { pino } from 'pino';
import pretty from 'pino-pretty';

const logger = pino(pretty({
    colorize: true,
    translateTime: 'SYS:standard',
    ignore: 'pid,hostname'
}));

logger.info('Servidor iniciado com sucesso!');
logger.info(`Servidor rodando na porta http://localhost:${process.env.PORT}`);

app.listen({ port: env.PORT });
