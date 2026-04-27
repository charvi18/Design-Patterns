class DatabaseConnection {
  private static instance: DatabaseConnection = new DatabaseConnection();

  private connectionId: string;
  private queryCount: number = 0;

  private constructor() {
    this.connectionId = Math.random().toString(36).slice(2);
    console.log(`DB connection created: ${this.connectionId}`);
  }

  public static getInstance(): DatabaseConnection {
    return this.instance;// eager 
  }
  getQueryCount() {
  return this.queryCount;
}

  query(sql: string) {
    this.queryCount++;
    return `[${this.connectionId}] Running: ${sql}`;
  }
}


// usage
const db1 = DatabaseConnection.getInstance();
const db2 = DatabaseConnection.getInstance();

console.log(db1 === db2);

console.log(db1.query("SELECT * FROM users"));
console.log(db2.query("SELECT * FROM orders"));

console.log("Total Queries:", db1.getQueryCount());
