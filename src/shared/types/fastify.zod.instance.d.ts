 
import type { 
  FastifyInstance, 
  FastifyBaseLogger, 
  RawReplyDefaultExpression, 
  RawRequestDefaultExpression, 
  RawServerDefault
} from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

// Define o tipo padrão global para instâncias do Fastify com Zod
export type FastifyZodInstance = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FastifyBaseLogger,
  ZodTypeProvider
>;
