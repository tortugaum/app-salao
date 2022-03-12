const express = require('express');
const FuncionarioController = require('./controller/FuncionarioController');
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


routes.get('/funcionarios/lista', FuncionarioController.lista);
routes.post('/funcionarios/get', FuncionarioController.get);
routes.post('/funcionarios/adicionar', FuncionarioController.adicionar);

module.exports=routes;