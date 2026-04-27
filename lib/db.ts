import Database from 'better-sqlite3';

// Check if we're using PostgreSQL vs SQLite
const isPostgres = (process.env.DATABASE_URL || '').startsWith('postgresql://');

let dbInstance: any = null;

export function getDb() {
  if (dbInstance) return dbInstance;
  
  if (isPostgres) {
    throw new Error('Cannot use getDb() with PostgreSQL. Use pg client directly for production.');
  }
  
  const Database = require('better-sqlite3');
  const dbPath = process.env.DATABASE_URL || './culbridge.db';
  
  dbInstance = new Database(dbPath);
  dbInstance.pragma('journal_mode = WAL');
  
  return dbInstance;
}

// PostgreSQL client for production
let pgClient: any = null;
let pgPool: any = null;

async function getPgPool() {
  if (pgPool) return pgPool;
  
  if (isPostgres) {
    const { Pool } = await import('pg');
    pgPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    });
  } else {
    // SQLite wrapper that mimics pg Pool interface
    const Database = require('better-sqlite3');
    const dbPath = process.env.DATABASE_URL || './culbridge.db';
    const db = new Database(dbPath);
    pgPool = {
      query: (text: string, params: any[]) => {
        try {
          // Convert PostgreSQL $1, $2, $3 style to SQLite ? style
          const convertedText = text.replace(/\$(\d+)/g, '?');
          const rows = db.prepare(convertedText).all(params);
          return { rows };
        } catch (err: any) {
          // Re-throw with code for error handling
          const error = new Error(err.message);
          (error as any).code = err.errno || err.code || err.errno || err.message;
          throw error;
        }
      }
    };
  }
  
  return pgPool;
}

// Wrapper that mimics pg Pool interface for the signup/login routes
export const pool = {
  query: async (text: string, params: any[]) => {
    const p = await getPgPool();
    return p.query(text, params);
  }
};