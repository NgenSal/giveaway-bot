const Discord = require('discord.js');
const client = new Discord.Client();
let fs = require('fs');
const { TOKEN, PREFIX } = require("./util/ngenskuy");

client.prefix = PREFIX;

client.on('ready', () => {
  console.log(`Bot tag: ${client.user.tag}`);
  console.log(`Guilds: ${client.guilds.cache.size}`);
  client.user.setActivity(`with ${PREFIX}giveaway & ${PREFIX}help`, { type: 'PLAYING' });
});

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

client.on('message', async message => {
  if (message.content.startsWith(`${PREFIX}`)) {
    let file_name = `${message.content.split(' ')[0].replace(PREFIX, '')}.js`;
    if(!fs.existsSync('./commands/' + file_name)) return undefined;
    if(fs.existsSync('./commands/' + file_name)) {
      client.commands.get(file_name.replace('.js', '')).execute(client, message);
    }
  }
});

client.login(TOKEN);
