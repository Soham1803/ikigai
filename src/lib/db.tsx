import Database from "@tauri-apps/plugin-sql";
import { Task } from "@/types";

export const createTable = async () => {
    try {
        const db = await Database.load("sqlite:tasks.db");
        await db.execute("CREATE TABLE IF NOT EXISTS tasks (id TEXT PRIMARY KEY, title TEXT, status TEXT, completed BOOLEAN)");
        console.log("Table created successfully");
    } catch(error) {
        console.error("Error creating table", error);
    }
}

export const insertTask = async (task: Task) => {
    try {
        const db = await Database.load("sqlite:tasks.db");
        console.log("DB: ", db);
        await db.execute("INSERT INTO tasks (id, title, status, completed) VALUES (?, ?, ?, ?)", [task.id, task.title, task.status, task.completed]);
        console.log("Task inserted successfully");
    } catch(error) {
        console.error("Error inserting task", error);
    }
}

export const getTasks = async () => {
    try {
        const db = await Database.load("sqlite:tasks.db");
        const tasks = await db.execute("SELECT * FROM tasks");
        console.log("Tasks retrieved successfully");
        return tasks;
    } catch(error) {
        console.error("Error retrieving tasks", error);
    }
}

export const updateTask = async (task: Task) => {
    try {
        const db = await Database.load("sqlite:tasks.db");
        await db.execute("UPDATE tasks SET title = ?, status = ?, completed = ? WHERE id = ?", [task.title, task.status, task.completed, task.id]);
        console.log("Task updated successfully");
    } catch(error) {
        console.error("Error updating task", error);
    }
}

export const deleteTask = async (id: string) => {
    try {
        const db = await Database.load("sqlite:tasks.db");
        await db.execute("DELETE FROM tasks WHERE id = ?", [id]);
        console.log("Task deleted successfully");
    } catch(error) {
        console.error("Error deleting task", error);
    }
}