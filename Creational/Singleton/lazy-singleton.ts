class DatabaseConnection {
  private static instance: DatabaseConnection | null = null;

  private connectionId: string;
  private queryCount: number = 0;

  // private constructor = prevents direct object creation
  private constructor() {
    this.connectionId = Math.random().toString(36).slice(2);
    console.log(`New DB connection opened: ${this.connectionId}`);
  }

  // Lazy initialization happens here
  public static getInstance(): DatabaseConnection {
    if (this.instance === null) {
      this.instance = new DatabaseConnection();
    }
    return this.instance;
  }

  public query(sql: string) {
    this.queryCount++;
    return `[${this.connectionId}] Running: ${sql}`;
  }

  public getQueryCount(): number {
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