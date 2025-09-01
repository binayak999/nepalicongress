const mongoose = require('mongoose');
const { string } = require('@hapi/joi');

const MeetingSchema = new mongoose.Schema({
    comminuty: {
        type: String,
        required: true,
    },
    province:{
        type:String,
        required:true
    },
    district: {
        type: String,
        required: true,
    },
    houseofrepresentative: {
        type: String,
    },
    pradeshassemblyconstituency: {
        type: String,
    },
    municipality: {
        type: String,
    },
    ward: {
        type: String,
    },
    tole: {
        type: String,
    },
    meetingDate: {
        type: String,
        required: true,
    },
    meetingTime: {
        type: String,
        required: true,
    },
    meetingPlace: {
        type: String,
        required: true,
    },
    meetingAgenda: {
        type: String,
        required: true,
    },
    meetingComment: {
        type: String,
        required: true,
    },
    meetingMinute: {
        type: String,
    },
    meetingAttendees: {
        type: Array,
        required: true,
    },
    userHandle:{
        type:String
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

module.exports = mongoose.model('meeting', MeetingSchema);