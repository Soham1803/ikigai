import Database from "@tauri-apps/plugin-sql";
import { Task } from "@/types";

export const createTable = async () => {
    try {
        const db = await Database.load("sqlite:tasks.db");
        await db.execute("CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, date TEXT, status TEXT, completed BOOLEAN)");
        console.log("Table created successfully");
    } catch(error) {
        console.error("Error creating table", error);
    }
}

export const insertTask = async (task: Task) => {
    try {
        const db = await Database.load("sqlite:tasks.db");
        console.log("DB: ", db);
        await db.execute("INSERT INTO tasks (title, date, status, completed) VALUES (?, ?, ?, ?)", [task.title, task.date, task.status, task.completed]);
        console.log("Task inserted successfully");
    } catch(error) {
        console.error("Error inserting task", error);
    }
}

export const getTasks = async () => {
    try {
        const db = await Database.load("sqlite:tasks.db");
        const tasks = await db.select("SELECT * FROM tasks");
        console.log("Tasks retrieved successfully");
        return tasks;
    } catch(error) {
        console.error("Error retrieving tasks", error);
    }
}

export const getTasksByDate = async (date: string) => {
    try {
        const db = await Database.load("sqlite:tasks.db");
        const tasks = await db.select("SELECT * FROM tasks WHERE date = ?", [date]);
        console.log("Tasks retrieved successfully");
        return tasks;
    } catch(error) {
        console.error("Error retrieving tasks", error);
    }
}

export const updateTask = async (task: Task) => {
    try {
        const db = await Database.load("sqlite:tasks.db");
        await db.execute("UPDATE tasks SET title = ?, date = ?, status = ?, completed = ? WHERE id = ?", [task.title, task.date, task.status, task.completed, task.id]);
        console.log("Task updated successfully");
    } catch(error) {
        console.error("Error updating task", error);
    }
}

export const deleteTask = async (id: string | undefined) => {
    try {
        const db = await Database.load("sqlite:tasks.db");
        await db.execute("DELETE FROM tasks WHERE id = ?", [id]);
        console.log("Task deleted successfully");
    } catch(error) {
        console.error("Error deleting task", error);
    }
}

export const clearTasks = async () => {
    try {
        const db = await Database.load("sqlite:tasks.db");
        await db.execute("DELETE FROM tasks");
        console.log("Tasks cleared successfully");
    } catch(error) {
        console.error("Error clearing tasks", error);
    }
}