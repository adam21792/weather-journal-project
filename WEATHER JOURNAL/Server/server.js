const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

let projectData = {};

app.post('/add', (req, res) => {
  projectData = req.body;
  res.send(projectData);
});

app.get('/all', (req, res) => {
  res.send(projectData);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});