const { JsonWebTokenError } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');

class LoginController{
    login(req,res){
        const {username,password} = req.body;

        if(username == 'luiz' && password == '123'){
            const id = 1;
            const token = jwt.sign(
                {id},process.env.SECRET,{expiresIn: 300}
            )

            return res.json({auth: true, token:token});
        }else{
            return res.status(400).json({atuh: false, mesage: 'Credenciais inválidas'});
        }
    }


    logout(req,res){
        res.json({auth: false,token:null});
    }


    verifyToken(req,res,next){
        const token = req.headers['x-access-token'];
        if(!token) return res.status(401).json({auth: false, message: 'Token inválido'});

        jwt.verify(token, process.env.SECRET, (err,decoded) =>{
            if(err) return res.status(500).json({auth: false, message: 'Falha ao autenticar token'});

            req.userId = decoded.id;
            next();
        })
    }
}

module.exports = new LoginController();