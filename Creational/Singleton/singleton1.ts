class DatabaseConnection {
  private static instance: DatabaseConnection;

  private connectionId: string;
  private queryCount: number = 0;

  private constructor() {
    this.connectionId = Math.random().toString(36).slice(2);
    console.log(`New DB connection opened: ${this.connectionId}`);
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  query(sql: string) {
    this.queryCount++;
    return `[${this.connectionId}] Running: ${sql}`;
  }

  getQueryCount() {
    return this.queryCount;
  }
}


const db1 = DatabaseConnection.getInstance();
const db2 = DatabaseConnection.getInstance();
const db3 = DatabaseConnection.getInstance();

console.log(db1 === db2); 
console.log(db2 === db3); 

console.log(db1.query("SELECT * FROM users"));
console.log(db2.query("SELECT * FROM orders"));
console.log(db3.query("SELECT * FROM payments"));

console.log("Total Queries:", db1.getQueryCount());