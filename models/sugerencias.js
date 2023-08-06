const { Schema, model } = require("mongoose")

const setupSugerencia = new Schema({
    guildID: { type: String },
    channelID: { type: String },
})

module.exports = model("Sugerencias", setupSugerencia)
