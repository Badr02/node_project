import { Schema, model } from "mongoose";

const professor = new Schema({
    username: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    subjects: [{
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'subject'
    }]
});

export default model('professor', professor);