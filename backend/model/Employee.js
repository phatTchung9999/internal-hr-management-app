const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    checked: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    }
})


module.exports = mongoose.model('Employee', employeeSchema);