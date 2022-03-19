const nodemailer = require('nodemailer');
const path = require('path');
const hbs = require('nodemailer-express-handlebars');

const {host, port, user, pass} = require('../config/mail.json');

const transport = nodemailer.createTransport({
    host: host,
    port: port,
    auth: { user, pass}
});

transport.use('compile',hbs({
    viewEngine: 'handlebars',
    viewPath: path.resolve('./src/resource/mail/'),
    extName: '.html',
    defaultLayout: null
}));

module.exports = transport;