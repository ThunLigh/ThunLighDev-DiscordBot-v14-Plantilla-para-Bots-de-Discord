const fs = require('fs')
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v10");
const config = require('./config.json')
const clientID = (config.clientID)
const commandFolders = fs.readdirSync('./commands');
const commands = []

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter((file) => file.endsWith('.js'));
    for (const file of commandFiles) {
        const slash = require(`./commands/${folder}/${file}`)
            commands.push(slash.cmd.toJSON())
    }
}

const rest = new REST({ version: "10" }).setToken(config.token)
createSlash()

async function createSlash() {
    try {
        await rest.put(
            Routes.applicationCommands(clientID), {
            body: commands
        })
        console.log("SlashCommands publicados".blue)
    } catch (err) {
        console.error(err)
    }
}