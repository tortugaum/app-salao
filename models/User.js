const mongoose = require('../database/index');
const schema = mongoose.Schema;

const bcrypt = require('bcrypt');

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
        require: true,
        select:false
    },
    comissao: {
        type: Number
    },
    criadoEm:{
        type: Date,
        default: Date.now
    }
});


userSchema.pre('save',async function(next){
    const hash = await bcrypt.hash(this.password,10);
    this.password = hash;

    next();
})

const user = mongoose.model('User',userSchema);

module.exports = user;