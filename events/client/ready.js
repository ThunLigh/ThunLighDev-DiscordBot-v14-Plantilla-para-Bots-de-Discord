const { ActivityType } = require("discord.js");
const mongoose = require("mongoose");
const config = require("../../config.json");

module.exports = {
    name: "ready",
    async execute(client, prefix) {
        
        await mongoose.connect(config.mongoDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => console.log("Se ha conectado con la DataBase".magenta)).catch((err) => console.error("Error al conectar con la DataBase", err));

        console.log(` Conectado como ${client.user.tag} `.bgBlue.bold)
        client.user.setActivity({ name: "dsc.gg/thunlighdev", type: ActivityType.Watching });
    }
}