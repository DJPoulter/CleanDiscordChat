const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const fs = require('fs');
const botCommands = require('./commands');

function write(array) {
  fs.writeFileSync("./commands.json", JSON.stringify(array));
}

function read() {
  const fileContent = fs.readFileSync("./commands.json");
  const array = JSON.parse(fileContent);
  return array;
}

Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

let bots = read()

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
  bot.user.setActivity("with your mess!");
});

bot.on('message', msg => {

  if (msg.content === 'ping') {
    msg.reply('pong');
  } else if (msg.content.startsWith('makeSafe')) {
    if (msg.mentions.users.size) {
      const taggedUser = msg.mentions.users.first();
      const safeUser = {"username": taggedUser.username, "id": taggedUser.id}
      bots.push(safeUser);
      write(bots)
      msg.channel.send(`You just made ${taggedUser.username} safe`);
    } else {
      msg.reply('Please tag a valid user!');
    }
  }

  if (msg.channel.name === 'rpg-space' && 
    bots.find(bot => bot === msg.content.toLowerCase().split(" ")[0]) || 
    bots.find(bot => bot === msg.content.toLowerCase()[0])
  )
  {
    msg.delete(1);
  } 
  if (msg.channel.name === 'rpg-space' && 
  msg.author.id === "749820490926784615" &&
  msg.content?.includes('PET')
  )
  {
    msg.delete(30000);
  }
 
  if (msg.channel.name === 'rpg-space' && 
  msg.embeds[0]?.description?.includes('enchanted'))
  {
    
    msg.delete(10000);
  }

  if (msg.content?.includes('Erin'))
  {
    msg.reply("She is weird");
  }


  // if (msg.mentions.users.first()?.id === "106075884506591232")
  // {
  //   msg.reply('Why are you messaging the one and only Dashster?')
  // }
});
