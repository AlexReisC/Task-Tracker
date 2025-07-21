import Fastify from "fastify";
import { getAllTasks, saveTask } from "./models/task.model.js";
import {postTask} from "./schemas/schemas.js"

const fastify = Fastify({logger: true});

fastify.get("/tasks", async (request, reply) => {
    const tasks = getAllTasks();
    reply.send(tasks);
});

fastify.post("/tasks", async (request, reply) => {
    const body = request.body;
    saveTask(body);
    
    return reply.status(201).send();
});

fastify.put("/tasks/:id", async (request, reply) => {
    const taskId = request.params.id;
    
});

fastify.patch("/tasks/:id", async (request, reply) => {

});

fastify.delete("/tasks/:id", async (request, reply) => {

});

export default fastify;