const mongoose = require('../database/index');
const schema = mongoose.Schema;

const userSchema = new schema({
    name: {
        type: String,
        require: true
    },
    email:{
        type: String
    },
    phone: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    comissao: {
        type: Number
    },
    criadoEm:{
        type: Date,
        default: Date.now
    }
});


const user = mongoose.model('User',userSchema);

module.exports = user;