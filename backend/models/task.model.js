import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '../db/tasks.json');

export function getAllTasks() {
    if (!fs.existsSync(dbPath)) return [];

    const raw = fs.readFileSync(dbPath, 'utf-8').trim();
    if (!raw) return [];
    return JSON.parse(raw);
}

export function saveTask(task) {
    const tasks = getAllTasks();
    tasks.push(task);
    const json = JSON.stringify(tasks, null, 2);
    fs.writeFileSync(dbPath, json, 'utf-8');
}

export function getTaskByID(taskID){
    if(!fs.existsSync(dbPath)) return [];

    const raw = fs.readFileSync(dbPath, 'utf-8');
    if(!raw) return [];
    const array = JSON.parse(raw);
    
    const taskFounded = array.filter(task => task.id == taskID);
    if(taskFounded.length === 0) return [];
    return taskFounded[0];
}

export function updateTaskByID(updatedData, id) {
    const tasks = getAllTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);

    if(taskIndex === -1) return false;
    const existingTask = tasks[taskIndex];
    
    tasks[taskIndex] = {
        ...existingTask,
        ...updatedData
    };
    
    const json = JSON.stringify(tasks, null, 2);
    fs.writeFileSync(dbPath, json, 'utf-8');
    
    return true;
}

export function deleteTaskByID(id){
    const tasks = getAllTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if(taskIndex === -1) return false;
    
    tasks.splice(taskIndex, 1);
    const json = JSON.stringify(tasks, null, 2);
    fs.writeFileSync(dbPath, json, 'utf-8');

    return true;
}