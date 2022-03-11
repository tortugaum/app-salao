const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');

class App{
    constructor(){
        this.express = express();
        this.isDev = process.env.NODE_ENV !== 'Production';

        this.middlewares();
        this.routes();
        this.views();
    }

    middlewares(){
        this.express.use(express.urlencoded({extended: true, limit: '200mb'}));
        this.express.use(bodyParser.json());
    }

    routes(){
        this.express.use(routes);
    }

    views(){}
}


module.exports = new App().express;
