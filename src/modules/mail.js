const nodemailer = require('nodemailer');
const path = require('path');
const hbs = require('nodemailer-express-handlebars');

const {host, port, user, pass} = require('../config/mail.json');

const transport = nodemailer.createTransport({
    host: host,
    port: port,
    auth: { user, pass}
});


const hbOptions = {
    viewEngine: {
        partialsDir: path.resolve('./src/resource/mail/'),
        layoutsDir: path.resolve('./src/resource/mail/'),
        defaultLayout : 'passwordReset.html',
        extName: '.html',
    },
    viewPath: path.resolve('./src/resource/mail/'),
    extName: '.html',
}
transport.use('compile', hbs(hbOptions));

module.exports = transport; 