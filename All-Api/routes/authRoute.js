const express = require('express');

const routes = express();

const { register, login, users, changepassword } = require('../controllers/AuthController');

const { verifyToken } = require('../middleware/Auth');

routes.post('/login', login);
routes.get('/register', register);
routes.get('/users', verifyToken, users);
routes.post('/changepassword', verifyToken, changepassword);

module.exports = routes;