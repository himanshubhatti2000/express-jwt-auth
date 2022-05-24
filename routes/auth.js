const express = require('express');
const authRouter = express.Router();
const login=require('../controllers/auth/login');
const signup=require('../controllers/auth/signup');
const refresh=require('../controllers/auth/refresh');

authRouter.use(express.json());

/* Login*/
authRouter.post('/login',login);
authRouter.post('/signup',signup );
authRouter.get('/refresh',refresh);

module.exports = authRouter;
