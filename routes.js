const express = require('express');
const LoginController = require('./controller/LoginController');

const routes = express.Router();


routes.get('/',(req,res)=>{
    res.send('Aplicativo está funcionando');
})


routes.get('/auth',LoginController.verifyToken,(req,res)=>{
    res.send('Aplicativo está funcionando com autenticação');
})

routes.post('/login', LoginController.login);
routes.post('/logout', LoginController.logout);

module.exports=routes;