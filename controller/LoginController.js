const jwt = require('jsonwebtoken');
const userModel = require('../models/User');
const bcrypt = require('bcrypt');

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

}

module.exports = new LoginController();