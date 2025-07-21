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