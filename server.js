const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // your MySQL password
  database: 'lohgad_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected!');
});

app.post('/submit-feedback', (req, res) => {
  const { name, email, message } = req.body;

  const sql = 'INSERT INTO feedback (name, email, message) VALUES (?, ?, ?)';
  db.query(sql, [name, email, message], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Feedback submitted successfully!');
  });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
