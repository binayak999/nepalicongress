const mongoose = require('mongoose');
const { bool, boolean } = require('@hapi/joi');
//import the slug package
const slug = require('mongoose-slug-generator');
//Initialize
options = {
    separator: "-",
    lang: "en",
    truncate: 120
},
mongoose.plugin(slug, options);

const historySchema = new mongoose.Schema({
    title:String,
    eng: {
        type: Object,
        required: true,
    },
    nep: {
        type: Object,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
        slug:"title",
        slug_padding_size: 4
    },
    attachment: {
        type: Array,
    },
    images: {
        type: Array,
    },
    videos: {
        type: Array,
    },
    category:{
        type:Array,
        required:true,
    },
    externallink:{
        type:String,
    },
    userHandle:{
        type:String,
        required:true,
    },
    status:{
        type:Boolean,
        required:true,
        default:true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        default: Date.now()
    },
    countView: {
        type: Number,
        default: 1
    },
    sort:{
        type:Number,
        default:0
    },
    externalContent:{
        type:String
    }
})

module.exports = mongoose.model('History', historySchema);