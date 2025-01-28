// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

// Use body-parser to parse JSON
app.use(bodyParser.json());

// Create comments array
let comments = [];

// Serve comments array
app.get('/', (req, res) => {
  res.json(comments);
});

// Add new comment to comments array
app.post('/', (req, res) => {
  comments.push(req.body);
  fs.writeFile('comments.json', JSON.stringify(comments, null, 2), (err) => {
    if (err) {
      res.status(500).send('Failed to save comment');
    } else {
      res.status(201).send('Comment added');
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});