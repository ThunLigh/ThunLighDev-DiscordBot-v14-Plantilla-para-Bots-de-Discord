const fs = require("fs")
const Discord = require("discord.js")
const { Client } = require("discord.js");
const client = new Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.GuildVoiceStates
        // 3276799
    ]
});
require("./slashCommands")
require("colors")

const config = require("./config.json")

console.log(`Handler hecho por: ThunLigh `.red + `https://github.com/ThunLighDev`.blue)

client.slashCommands = new Discord.Collection();

fs.readdirSync("./commands").forEach(subFolder => {
    const commmandFiles = fs.readdirSync(`./commands/${subFolder}`).filter(file => file.endsWith(".js"))
    for (const file of commmandFiles) {
        const command = require(`./commands/${subFolder}/${file}`)
        client.slashCommands.set(command.cmd.name, command)
    }
})
console.log(`${client.slashCommands.size} slashCommands cargados`.green)

console.log('Cargando handlers...'.yellow);

const handlerFiles = fs.readdirSync("./handlers").filter(file => file.endsWith(".js"));

for (const file of handlerFiles) {
    const handler = require(`./handlers/${file}`);
    try {
        handler(client); // Llamamos directamente al handler si no necesita argumentos
    } catch (e) {
        console.log(`ERROR AL CARGAR EL HANDLER ${file}`.bgRed.bold);
        console.log(e);
    }
}

console.log(`${handlerFiles.length} Handlers cargados`.green);

console.log('Cargando eventos...'.yellow);

let totalHandlersLoaded = 0;

fs.readdirSync("./events").forEach(subFolder => {
    const eventFiles = fs.readdirSync(`./events/${subFolder}/`).filter((file) => file.endsWith(".js"))
    for (const file of eventFiles) {
        try {
            const events = require(`./events/${subFolder}/${file}`)
            if (events.once) {
                client.once(events.name, (...args) => events.execute(...args))
            } else {
                client.on(events.name, (...args) => events.execute(client, ...args))
            }
            totalHandlersLoaded++;
        } catch (e) {
            console.log(`ERROR AL CARGAR EL EVENTO ${file}`.bgRed.bold);
            console.log(e);
        }
    }
})

console.log(`${totalHandlersLoaded} Eventos cargados`.green);

client.login(config.token)