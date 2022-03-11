require("dotenv").config();

const server = require('./server');


const port = process.env.PORT;

server.listen(
    port,async() =>{
        try {
            console.log(`O Aplicativo está rodando na porta ${port}.`);
            console.log(`O ambiente atual é ${process.env.NODE_ENV}`);
            
        } catch (error) {
            console.log(error.message || error);
        }
    }
);