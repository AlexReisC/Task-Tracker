import { listTasks, createTask, updateTask, deleteTask } from '../controllers/task.controller.js';

export default async function taskRoutes(fastify, options) {
  fastify.get('/tasks', listTasks);

  fastify.post('/tasks', {
    schema: {
      body: {
        type: 'object',
        properties: {
          title: { type: 'string', minLength: 1 },
          description: { type: 'string' },
          done: { type: 'boolean' }
        },
        required: ['title']
      }
    }
  }, createTask);

  fastify.patch('/tasks/:id', {
    schema: {
      body: {
        type: 'object',
        properties: {
          title: { type: 'string', minLength: 1 },
          description: { type: 'string' },
          done: { type: 'boolean' }
        }
      }
    }
  }, updateTask);
  
  fastify.delete("/tasks/:id", deleteTask);
}
