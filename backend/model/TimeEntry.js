const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeEntrySchema = new Schema(
    {
        employee: {
            type: Schema.Types.ObjectId,
            ref: 'Employee',
            required: true,
            index: true
        },
        date: {
            type: Date,
            required: true,
            index: true
        },
        clockIn: {
            type: Date,
            required: true
        },
        clockOut: {
            type: Date,
            required: true
        },
        breakMinutes: {
            type: Number,
            default: 0,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

timeEntrySchema.index({ employee: 1, date: 1 });

module.exports = mongoose.model('TimeEntry', timeEntrySchema);
