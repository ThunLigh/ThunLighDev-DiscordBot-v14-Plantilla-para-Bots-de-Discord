const { SlashCommandBuilder } = require('discord.js')
const setupSugerencia = require("../../models/sugerencias.js");

module.exports = {
    cmd: new SlashCommandBuilder()
        .setName('setup-sugerencias')
        .setDescription('Establece un canal de sugerencias')
        .addChannelOption(option => option.setName("canal").setDescription("Canal de sugerencias").setRequired(true)),

    async execute(client, interaction) {

        const { options, guild } = interaction;

        const canal = options.getChannel("canal");

        // let data = await setupSugerencia.findOne({ guildID: interaction.guild.id })
        let newdata = await new setupSugerencia({
            guildID: guild.id,
            channelID: canal.id
        })

        await setupSugerencia.findOneAndUpdate({ guildID: guild.id }, {
            channelID: canal.id
        })

        newdata.save()

        interaction.reply(`Hecho! el canal de sugerencias es: ${canal}`)
    }
}
