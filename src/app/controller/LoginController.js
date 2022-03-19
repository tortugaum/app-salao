const jwt = require('jsonwebtoken');
const userModel = require('../models/User');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mail = require('../../modules/mail');
const { mainModule } = require('process');

class LoginController {
    async register(req, res) {
        try {

            const {email} = req.body
            if(await userModel.findOne({email}))
                return res.status(400).send('Usuário já existe');

            const newUser = await userModel.create(req.body);

            return res.send({ newUser });
        } catch (error) {
            return res.status(500).send(error);
        }
    }
    async login(req, res) {
        const { email, password } = req.body;
        try {
            
            const user = await userModel.findOne({email}).select('+password');
            
            if(!user)
                return res.status(400).json({message: 'Usuário não encontrado'});
            
            if(!await bcrypt.compare(password,user.password)){
                return res.status(400).json({message: 'Credenciais inválidas'});
            }

            const token = jwt.sign(
                { 
                    name: user.name,
                    id: user.id 
                }, process.env.SECRET, { expiresIn: 86400 }
            );
                
            return res.json({ auth: true, token: token });

        } catch (error) {
            return res.status(500).json(error);
        }
    }


    logout(req, res) {
        return res.json({ auth: false, token: null });
    }


    async forgotPassword(req,res){
        const {email} = req.body;

        try {
            const user = await userModel.findOne({email});

            if(!user)
                return res.status(400).send({message: 'Não foi possível encontrar o usuário'});

            const token = crypto.randomBytes(20).toString('hex');

            const now = new Date();
            now.setHours(now.getHours() + 1);

            await userModel.findByIdAndUpdate(user.id,{
                '$set': {
                    passwordResetToken: token,
                    passwordResetExpires: now,
                }
            });

            mail.sendMail({
                to : email,
                from : 'luizfelipeforcato@gmail.com',
                template: 'passwordReset',
                context: {token}
            }, (err)=>{
                if(err)
                    return res.status(400).send({error: 'Erro ao recuperar senha, tente novamente'});
                
                return res.status(200).send();
            });
            
        } catch (error) {
            return res.status(400).send({error: 'Erro ao recuperar senha, tente novamente'});
        }
    }

}

module.exports = new LoginController();