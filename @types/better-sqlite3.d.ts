declare module 'better-sqlite3' {
  interface Database {
    exec(sql: string): void;
    prepare(sql: string): Statement;
    pragma(pragma: string): void;
    close(): void;
  }

  interface Statement {
    all(...params: any[]): any[];
    run(...params: any[]): { changes: number; lastInsertRowid: number };
    get(...params: any[]): any;
  }

  interface DatabaseConstructor {
    new (path: string): Database;
  }

  const Database: DatabaseConstructor;

  export = Database;
}
