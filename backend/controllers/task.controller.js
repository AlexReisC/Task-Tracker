import { deleteTaskByID, getAllTasks, getTaskByID, saveTask, updateTaskByID } from "../models/task.model.js";
import { randomUUID } from "node:crypto"

export async function listTasks(request, reply){
    const tasks = getAllTasks();
    reply.send(tasks);
}

export async function createTask(request, reply) {
    const {title, description, done = false} = request.body;
    const task = {
        id: randomUUID(),
        title,
        description: description || '',
        done
    }

    saveTask(task);
    return reply.status(201).send(task);
}

export async function updateTask(request, reply) {
    const taskID = request.params.id;
    const data = request.body;
    
    const updated = updateTaskByID(data, taskID);
    if(!updated){
        return reply.status(404).send({message: "Tarefa não encontrada"});
    }

    return reply.status(204).send();
}

export async function deleteTask(request, reply) {
    const taskID = request.params.id;
    const deleted = deleteTaskByID(taskID);

    if (!deleted) {
        return reply.status(404).send({message: "Tarefa não encontrada"});
    }

    return reply.status(204).send();
}