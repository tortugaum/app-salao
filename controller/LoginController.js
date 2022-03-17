const user = require('../models/User');
const jwt = require('jsonwebtoken');

class LoginController {
    async register(req, res) {
        try {

            const {email} = req.body
            if(await user.findOne({email}))
                return res.status(400).send('Usuário já existe');

            const newUser = await user.create(req.body);

            return res.send({ newUser });
        } catch (error) {
            return res.status(500).send(error);
        }
    }
    login(req, res) {
        const { email,username, password } = req.body;

        user.findOne({email: email }).then(user => {
            if (user) {
                if (user.password == password) {
                    const token = jwt.sign(
                        { namme: user.name }, process.env.SECRET, { expiresIn: 300 }
                    )

                    return res.json({ auth: true, token: token });
                } else {
                    res.status(400).json({
                        message: 'Usuário não encontrado'
                    })
                }
            } else {
                res.json({
                    message: 'Usuário não encontrado'
                })
            }
        });
    }


    logout(req, res) {
        res.json({ auth: false, token: null });
    }


    verifyToken(req, res, next) {
        const token = req.headers['x-access-token'];
        if (!token) return res.status(401).json({ auth: false, message: 'Token inválido' });

        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) return res.status(500).json({ auth: false, message: 'Falha ao autenticar token' });

            req.userId = decoded.id;
            next();
        })
    }
}

module.exports = new LoginController();