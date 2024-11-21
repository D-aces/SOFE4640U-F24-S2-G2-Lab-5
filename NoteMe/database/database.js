import * as SQLite from 'expo-sqlite';


// Open or create the database
const db = SQLite.openDatabase(
  {
    name: 'notes.db', // Database name
    location: 'default', // Location to store the database
  },
  () => {
    console.log('Database opened successfully');
  },
  error => {
    console.log('Error opening database:', error);
  }
);

// Create a table for notes
export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        subtitle TEXT,
        body TEXT
      );`,
      [],
      () => {
        console.log('Table created successfully');
      },
      error => {
        console.log('Error creating table:', error);
      }
    );
  });
};

// Insert a new note into the Notes table
export const addNote = (title, subtitle, body) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO Notes (title, subtitle, body) VALUES (?, ?, ?)`,
      [title, subtitle, body],
      (_, result) => {
        console.log('Note added successfully:', result);
      },
      error => {
        console.log('Error adding note:', error);
      }
    );
  });
};

// Fetch all notes from the Notes table, might be useful for the home page
export const getNotes = callback => {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM Notes`,
      [],
      (_, { rows }) => {
        callback(rows._array); // Pass the result to the callback
      },
      error => {
        console.log('Error fetching notes:', error);
      }
    );
  });
};

export default db;
