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

const eventSchema = new mongoose.Schema({
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
    images: {
        type: Array,
    },
    attachment: {
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
    sort:{
        type:Number,
        default:0
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
    externalContent:{
        type:String
    }
})

module.exports = mongoose.model('Event', eventSchema);