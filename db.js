import mysql from "mysql2/promise";

let connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "school_db",
    port: 3306
});

connection.query(
    "CREATE TABLE IF NOT EXISTS students (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) NOT NULL, age INT NOT NULL, class_name VARCHAR(20) NOT NULL)"
);

export default connection