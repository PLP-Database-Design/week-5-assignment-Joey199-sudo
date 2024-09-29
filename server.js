const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Configure the database connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Boitshepo*2022',
    database: process.env.DB_DATABASE || 'hospital_db',
    port: process.env.DB_PORT || 3307
});

// Connect to the database
connection.connect((error) => {
    if (error) {
        console.error('Error connecting to the db: ', error);
    } else {
        console.log('Connected successfully to the db!!');
    }
});

// Question 1. Retrieve all patients
app.get('/patients', (req, res) => {
    connection.query('SELECT patient_id, first_name, last_name, date_of_birth FROM patients', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});


// Question 2. Retrieve all providers
app.get('/providers', (req, res) => {
    connection.query('SELECT first_name, last_name, provider_specialty FROM providers', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});

// Question 3. Filter patients by First Name
app.get('/patients/first-name/:firstName', (req, res) => {
    const { firstName } = req.params;
    connection.query('SELECT * FROM patients WHERE first_name = ?', [firstName], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});

// Question 4. Retrieve all providers by their specialty
app.get('/providers/specialty/:specialty', (req, res) => {
    const { specialty } = req.params;
    connection.query('SELECT * FROM providers WHERE provider_specialty = ?', [specialty], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});

// Listen to the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
