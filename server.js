const express = require('express');
const mysql = require('mysql');
const database = require('./database/database');
const { registerUser, loginUser } = require('./controllers/controllers');
// const {sendText} = require('./src/post/post-text');
// const {fetchText} = require('./src/post/send-text');
const { sendText, fetchText } = require('./src/post/send-text');
const {send} =  require('./src/post/send-image')
const app = express();
const PORT = process.env.PORT || 3000;


// Middleware to parse JSON and form data
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/test-db', (req, res) => {
    db.query('SELECT 1 + 1 AS result', (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Database query failed');
      } else {
        res.send(`Database connected! Result: ${results[0].result}`);
      }
    });
  });

// Registration Route
app.post('/register', registerUser);

// Login Route
app.post('/login', loginUser);

//send text
app.post('./send-text', sendText);

// fetch the text
app.get('./fetch-text', fetchText);

// console.log(sendText,fetchText);
app.post('./send', send);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
