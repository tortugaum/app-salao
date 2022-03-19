const express = require('express');
const FuncionarioController = require('./src/app/controller/FuncionarioController');
const LoginController = require('./src/app/controller/LoginController');
const auth = require('./src/app/middleware/auth');

const routes = express.Router();


routes.get('/',(req,res)=>{
    res.send('Aplicativo está funcionando');
})


routes.get('/auth',auth,(req,res)=>{
    res.send(`Aplicativo está funcionando com autenticação. id: ${req.userId} - user: ${req.name}`);
})

routes.post('/login', LoginController.login);
routes.post('/logout', LoginController.logout);
routes.post('/register', LoginController.register);
routes.post('/forgotPassword', LoginController.forgotPassword);


routes.get('/funcionarios/lista', FuncionarioController.lista);
routes.post('/funcionarios/get', FuncionarioController.get);
routes.post('/funcionarios/adicionar', FuncionarioController.adicionar);

module.exports=routes;