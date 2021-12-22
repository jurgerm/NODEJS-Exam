const express = require('express');
const cors = require('cors');

require('dotenv').config();

const { port } = require('./config');

const app = express();

app.use(express.json());

// use cors middleware to allow requests from all origins
app.use(cors());

const auth = require('./routes/v1/auth');
app.use('/v1/auth/', auth);

const accounts = require('./routes/v1/accounts');
app.use('/v1/accounts/', accounts);

const bills = require('./routes/v1/bills');
app.use('/v1/bills', bills);

app.get('/', (req, res) => {
  res.send({ msg: 'Server is running' });
});

app.get('*', (req, res) => {
  res.status(404).send({ error: 'Page not found' });
});

app.listen(port, () => console.log(`Server is running on port ${port}`));