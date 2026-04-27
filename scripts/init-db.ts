import { hashPasswordSync } from '@/lib/auth';

export async function initDatabase() {
  const dbUrl = process.env.DATABASE_URL || './culbridge.db';
  const isPostgres = dbUrl.startsWith('postgresql://');

  if (isPostgres) {
    console.log('Initializing PostgreSQL database');
    const { Pool } = await import('pg');
    const pool = new Pool({
      connectionString: dbUrl,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    });

    // Create users table (PostgreSQL syntax)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT DEFAULT 'EXPORTER' CHECK (role IN ('ADMIN', 'EXPORTER', 'COMPLIANCE_OFFICER')),
        company_name TEXT,
        tin TEXT,
        is_verified BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create indexes
    await pool.query('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);');

    // Check if admin user exists
    const adminResult = await pool.query('SELECT id FROM users WHERE email = $1', ['culbridge01@gmail.com']);
    
    if (adminResult.rows.length === 0) {
      console.log('Creating admin user...');
      const passwordHash = hashPasswordSync('@Ugwuabuchidavid3');
      await pool.query(
        'INSERT INTO users (id, email, password_hash, role, is_verified) VALUES (1, $1, $2, $3, $4)',
        ['culbridge01@gmail.com', passwordHash, 'ADMIN', true]
      );
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }

    await pool.end();
    console.log('PostgreSQL database initialized successfully');
  } else {
    console.log('Initializing SQLite database at:', dbUrl);
    const Database = await import('better-sqlite3');
    const db = new Database.default(dbUrl);
    db.pragma('journal_mode = WAL');

    // Create users table (SQLite syntax)
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT DEFAULT 'EXPORTER' CHECK (role IN ('ADMIN', 'EXPORTER', 'COMPLIANCE_OFFICER')),
        company_name TEXT,
        tin TEXT,
        is_verified BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create indexes
    db.exec(`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
    `);

    // Check if admin user exists
    const admin = db.prepare('SELECT id FROM users WHERE email = ?').get('culbridge01@gmail.com');
    
    if (!admin) {
      console.log('Creating admin user...');
      const passwordHash = hashPasswordSync('@Ugwuabuchidavid3');
      db.prepare(`
        INSERT INTO users (id, email, password_hash, role, is_verified)
        VALUES (1, 'culbridge01@gmail.com', ?, 'ADMIN', 1)
      `).run(passwordHash);
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }

    db.close();
    console.log('SQLite database initialized successfully');
  }
}

// Run if called directly
if (require.main === module) {
  initDatabase().catch(console.error);
}