import { Schema, model } from "mongoose";

const subject = new Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    department: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'department'
    },
    previousReq: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'subject'
    },
    doctor: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'doctor'
    },
    students: [{
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'student'
    }],
});

export default model('subject', subject);