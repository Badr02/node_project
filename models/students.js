import { Schema, model } from "mongoose";

const student = new Schema({
    academicNumber: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    passedSubjects: [{
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'subject'
    }],
    registeredSubjects: [{
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'subject'
    }]
});

export default model('student', student);