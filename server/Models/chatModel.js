const mongoose = require("mongoose")

const chatSchema = new mongoose.chatSchema(
    {
        members: Array,
    },
    {
        timestamps: true,
    }
);

const chatModel = mongoose.chatModel("Chat",chatSchema);

module.exports = chatModel;