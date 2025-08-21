// models/Contact.js
const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  fullName: { type: String, required: true }, // 👈 if your schema uses fullName
  email:    { type: String, required: true },
  phone:    { type: String, required: true },
  subject:  { type: String, required: true },
  message:  { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Contact', ContactSchema);
