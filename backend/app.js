import Fastify from 'fastify';
import taskRoutes from './routes/task.routes.js';

const fastify = Fastify({ logger: true });

fastify.register(taskRoutes);

export default fastify;