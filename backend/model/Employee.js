const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    checked: {
      type: Boolean,
    },

    firstname: {
      type: String,
      required: true,
      trim: true,
    },

    lastname: {
      type: String,
      required: true,
      trim: true,
    },

    dateOfBirth: {
      type: Date,
    },

    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other', ''],
      default: '',
    },

    ethnicity: {
      type: String,
      default: '',
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    mobileNumber: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      default: '',
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    rate: {
      type: Number,
      default: 0,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    manager: {
      type: String,
      default: '',
      trim: true,
    },

    hireDate: {
      type: Date,
    },

    employmentStatus: {
      type: String,
      enum: ['Full-Time', 'Part-Time', 'Contractor', 'Intern', 'Temporary', ''],
      default: '',
    },

    recruiter: {
      type: String,
      default: '',
      trim: true,
    },

    photo: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Employee', employeeSchema);