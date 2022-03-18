const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) return res.status(401).json({ auth: false, message: 'Token inválido' });

    const parts = authHeader.split(' ');

    if(!parts.length == 2)
        return res.status(401).json({ auth: false, message: 'Token inválido' });

    const [scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme))
        return res.status(401).json({ auth: false, message: 'Token inválido' });

    
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return res.status(500).json({ auth: false, message: 'Falha ao autenticar token' });

        req.userId = decoded.id;
        req.name = decoded.name;
        next();
    })
}