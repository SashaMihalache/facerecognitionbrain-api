const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
const knex = require('knex');

const authCtrl = require('./controllers/AuthenticationCtrl');
const profileCtrl = require('./controllers/ProfileCtrl');
const imageCtrl = require('./controllers/ImageCtrl');

const db = knex({
  client: 'pg',
  connection: {
    host: 'postgresql-dimensional-82387',
    user: '',
    password: '',
    database: 'smartbrain'
  }
});

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  console.log('Server is running.');
  res.send('API is booted.')
});

app.get('/profile/:id', (req, res) => profileCtrl.handleGet(req, res, db));

app.post('/signin', (req, res) => authCtrl.handleSignin(req, res, db, bcrypt));
app.post('/register', (req, res) => authCtrl.handleRegister(req, res, db, bcrypt));

app.put('/image', (req, res) => imageCtrl.handleEdit(req, res, db));
app.post('/imageURL', (req, res) => imageCtrl.handleApiCall(req, res));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});