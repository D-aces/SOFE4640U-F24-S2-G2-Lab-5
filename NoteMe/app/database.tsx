import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export const initializeDatabase = async (): Promise<void> => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('newNote.db');
  }

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      created INTEGER NOT NULL
    );
  `);
  console.log('Database initialized');
};

// Add a new note
export const addNote = async (
  title: string,
  description: string
): Promise<number> => {
  if (!db) {
    throw new Error('Database not initialized');
  }

  const created = Math.floor(Date.now() / 1000); // Current Unix timestamp in seconds

  const result = await db.runAsync(
    'INSERT INTO notes (title, description, created) VALUES (?, ?, ?)',
    title,
    description,
    created
  );
  console.log('Note added with ID:', result.lastInsertRowId);
  return result.lastInsertRowId;
};

// Fetch all notes
export const getNotes = async (): Promise<{ id: number; title: string; description: string; created: number }[]> => {
  if (!db) {
    throw new Error('Database not initialized');
  }

  const result = await db.getAllAsync('SELECT * FROM notes');
  return result as { id: number; title: string; description: string; created: number }[];
};

// Search notes by title
export const searchNotes = async (
  query: string
): Promise<{ id: number; title: string; description: string; created: number }[]> => {
  if (!db) {
    throw new Error('Database not initialized');
  }

  const result = await db.getAllAsync('SELECT * FROM notes WHERE title LIKE ?', `${query}%`);
  return result as { id: number; title: string; description: string; created: number }[];
};