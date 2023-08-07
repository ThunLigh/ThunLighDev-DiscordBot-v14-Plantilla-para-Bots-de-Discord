const Discord = require("discord.js");
const setupSchema = require("../models/sugerencias.js");

module.exports = (client) => {
    client.on("messageCreate", async (message) => {
        if (message.author.bot) return;

        const data = await setupSchema.findOne({ guildID: message.guild.id })

        if (!data.guildID || !data.channelID || !message.guild.id || !message.channel.id) return
        if (message.channel.id === data.channelID) {
            const embed = new Discord.EmbedBuilder()
                .setTitle(`Sugerencia de: ${message.author.username}`)
                .setDescription(`> ${message.content}`)
                .setColor("Random")
                .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()

            let Channel = client.channels.cache.get(data.channelID)

            const mensaje = await Channel.send({ embeds: [embed] })

            mensaje.react("👍")
            mensaje.react("👎")
        }
    })
}
