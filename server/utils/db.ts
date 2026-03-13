import Database from 'better-sqlite3';
import { join } from 'path';

let db: Database.Database | null = null;

export const useDb = () => {
  if (!db) {
    const dbPath = process.env.DATABASE_URL || 'data.db';
    db = new Database(dbPath, { verbose: console.log });
    
    db.exec(`
      CREATE TABLE IF NOT EXISTS test (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS news (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        date DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        color TEXT NOT NULL DEFAULT '#6b21a8',
        logo TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      );
    `);

    const cols = db.prepare("PRAGMA table_info(news)").all() as { name: string }[];
    if (!cols.some(c => c.name === 'image')) {
      db.exec("ALTER TABLE news ADD COLUMN image TEXT");
    }

    const serviceCols = db.prepare("PRAGMA table_info(services)").all() as { name: string }[];
    if (!serviceCols.some(c => c.name === 'description')) {
      db.exec("ALTER TABLE services ADD COLUMN description TEXT");
    }

    // Initialisation des settings par défaut (si absents)
    const insertSetting = db.prepare(`INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)`);
    insertSetting.run('qualiopi_visible', '1');
    insertSetting.run('qualiopi_text', "La certification qualité a été délivrée au titre des catégories d'actions suivantes :\nACTIONS DE FORMATION\nBILANS DE COMPÉTENCES");
    insertSetting.run('qualiopi_logo', '');
  }
  return db;
};
