import Fastify from 'fastify';

import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { serializerCompiler, validatorCompiler, jsonSchemaTransform, type ZodTypeProvider } from '@fastify/type-provider-zod';
import { eventRoutes } from './modules/events/event.routes.js';
import { carRoutes } from './modules/cars/cars.route.js';
import { clubRoutes } from './modules/club/club.route.js';

const app = Fastify({
  logger: {
    transport:{
      target: 'pino-pretty',
      options: {
        ignore: 'pid,hostname',
        errorLikeObjectKeys: ['err', 'error'],
        translateTime: 'HH:MM:ss Z',
        colorize: true
      }
    }
  }
}).withTypeProvider<ZodTypeProvider>();

app.register(fastifySwagger, {
  openapi:{
    info:{
      title: "Rota Vintage API",
      description: "API para gerenciamento de eventos e clubes",
      version: "1.0.0"
    }
  
  },
  transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi,{
  routePrefix: "/docs",
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

 
app.register(eventRoutes);
app.register(carRoutes);
app.register(clubRoutes);
const start = async () => {
  try {
    await app.listen({ port: 3000, host: '0.0.0.0' });
    console.log("Servidor rodando na porta 3000");
  } catch (error: unknown) {
    app.log.error(error);
    console.error(error);
    process.exit(1);
  }
};

start();
