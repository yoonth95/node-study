import mysql from "mysql";

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA,
});

conn.connect((err) => {
  if (err) console.error(err);
  else console.log("Connected to the database");
});

export default conn;
