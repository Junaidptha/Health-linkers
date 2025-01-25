const express = require("express");
const mysql = require('mysql2');
const cors = require("cors");
const app = express();
app.use(cors()); // Allow frontend requests
app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Change this if your MySQL has a different username
    password: "Khan@619", // Add your MySQL password if you have one
    database: "hospital"
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to MySQL database.");
});
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index1.html");
  });

//   app.get("/school-details.html", (req, res) => {
//     res.sendFile(__dirname + "/school-details.html");
//   });
  app.get("/login.html", (req, res) => {
    res.sendFile(__dirname + "/login.html");
  });
  app.get("/register.html", (req, res) => {
    res.sendFile(__dirname + "/register.html");
  });
// API to get hospitals data
app.get("/hospitals", (req, res) => {
    db.query("SELECT * FROM hospitals", (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error retrieving data");
        } else {
            res.json(results);
        }
    });
});

// Start server
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
