const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    userId: { type: String, required: true },
    headerContent: { type: String, required: true },
    bodyContent: { type: String, required: true },
    category: { type: String, required: true }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;