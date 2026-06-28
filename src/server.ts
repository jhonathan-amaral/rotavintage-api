import Fastify from 'fastify';
import { serializerCompiler, validatorCompiler } from '@fastify/type-provider-zod';
import { eventRoutes } from './modules/events/event.routes.js';

const app = Fastify({
  logger: true
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

 
app.register(eventRoutes);

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
