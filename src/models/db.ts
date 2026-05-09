import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

// The "Warehouse" state. We keep track of the open door here.
let db: Database | null = null;

// 1. OPEN THE WAREHOUSE
export async function connectDB(): Promise<void> {
    // If it's already open, do nothing.
    if (db) return;

    // Open the door using the key (DB_PATH)
    const dbPath = process.env.DB_PATH;
    if (!dbPath) {
        throw new Error('Missing DB_PATH environment variable');
    }

    db = await open({
        filename: dbPath,
        driver: sqlite3.Database
    });
    
    console.log('Connected to the SQLite database.');
}

// 2. ENTER THE WAREHOUSE (Get access to run queries)
export function getDB(): Database {
    if (!db) {
        throw new Error('Database is not connected. Call connectDB first.');
    }
    return db;
}

// 3. CLOSE THE WAREHOUSE
export async function closeDB(): Promise<void> {
    if (db) {
        await db.close();
        console.log('Closed the database connection.');
        db = null;
    }
}
