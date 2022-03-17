const mongobd = require('mongodb');

class FuncionarioService{
    lista(req,res){
        res.json(funcionarios);
    }

    get(req,res){
        const {nome} = req.body;

        let resposta = '';
        funcionarios.forEach(e =>{
            if(e.nome == nome){
                resposta = e;
            }
        });

        res.json(resposta);
    }

    adicionar(req,res){
        const {nome, comissao} =req.body;
        funcionarios.push({
            nome: nome,
            comissao: comissao
        });

        res.send('Funcionario adicionado com sucesso');
    }

}

module.exports = new FuncionarioService();