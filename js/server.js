const express = require("express");
const mysql = require('mysql2');
const cors = require("cors");
const app = express();
app.use(cors()); // Allow frontend requests
app.use(express.json());
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
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
  app.get("/register12.html", (req, res) => {
    res.sendFile(__dirname + "/register12.html");
  });
  app.get("/ayushman.html", (req, res) => {
    res.sendFile(__dirname + "/ayushman.html");
  });
// API to get hospitals data
app.get("/hospitals", (req, res) => {
    db.query("SELECT * FROM hospitals limit 5", (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error retrieving data");
        } else {
            res.json(results);
        }
    });
});

// const bcrypt = require('bcryptjs');
// const db = require('./db');
app.post("/login", (req, res) => {
    const { email, password } = req.body;
  
    const query = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error("Error fetching data: " + err.stack);
            return res.status(500).send("An error occurred. Please try again.");
        }
        
        if (results.length > 0) {
            // User found - redirect to index2 or dashboard
            res.redirect("/index2");
        } else {
            // No user found with these credentials
            res.status(401).send("Invalid email or password.");
        }
    });
});


app.post("/register", (req, res) => {
    const {
      name,
      address,
      beds,
      oxygen_cylinders,
      doctors_available,
      latitude, // Optional, can be auto-generated
      longitude, // Optional, can be auto-generated
      ayushman_assured
    } = req.body;
  
    // SQL query to insert the hospital data into the `hospitals` table
    const query = `
      INSERT INTO hospitals (name, address, beds, oxygen_cylinders, doctors_available, latitude, longitude, ayushman_assured)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  
    // Values to insert
    const values = [name, address, beds, oxygen_cylinders, doctors_available, latitude || null, longitude || null, ayushman_assured];
  
    // Execute the query
    db.query(query, values, (err, results) => {
      if (err) {
        console.error("Error inserting data: " + err.stack);
        return res.status(500).send("An error occurred while registering the hospital.");
      }
  
      res.send("Hospital registration successful!");
    });
  });
  

  app.get("/register.html", (req, res) => {
    res.sendFile(__dirname + "/register.html");
  });


  app.get("/index2", (req, res) => {
    res.sendFile(__dirname + "/index2.html"); // Ensure the path is correct
});
// Start server
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
