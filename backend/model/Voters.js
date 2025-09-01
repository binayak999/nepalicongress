const mongoose = require('mongoose');

const votersSchema = new mongoose.Schema({
    votingGroup:{
        type:String,
        required:true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    voter_id:{
        type:String,
        required:true,
    },
    phone:{
        type: String,
        required: true,
        unique: true,
        max:10,
        min:10
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        default: Date.now()
    },

})

module.exports = mongoose.model('Voters', votersSchema);