const Discord = require("discord.js");
const client = new Discord.Client();
const bot = client;
const moment = require('moment');
const db = require('quick.db');
require('moment-duration-format');
let express = require('express');
let app = express()

const ayarlar = require('./ayarlar.json')

client.on('ready', ()=>{
  client.user.setStatus("dnd")
  client.user.setActivity('DevWork ❤️ Fayikcim')
    let fayikcim = client.channels.get('ses id');
    if (!fayikcim) return console.log(`Ses Kanalı Bulunamadı.`);
    fayikcim.join().then(console.log(`Ses Kanalına Bağlanıldı.`)).catch(err => console.error(`Ses Kanalına Bağlanılamadı.`));
    setInterval(() => {
      fayikcim.join();
        console.log(`Ses Kanalına Bağlantı Güncellendi.`);
    }, 600000 );
    });

client.on("message", async message => {
  if (message.content ===  '!tag'  || message.content ===  '.tag' || message.content ===  'tag') {
  message.channel.send('`Tagınız`')	  
  } 

});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on("guildMemberAdd", async member => {
if (member.guild.id !== "SunucuİD") return;
  let user = member.user
  const millisCreated = new Date().getTime() - user.createdAt.getTime();
  const daysCreated = moment.duration(millisCreated).format("Y [yıl], D [gün], H [saat], m [dakika], s [saniye]")
  member.setNickname(`İsim | Yaş`);
  member.addRole('Kayıtsız Rol İd')

let kanal = client.channels.get("KanalİD")
let emoji1 = client.emojis.get('EmojiİD') 
let emoji2 = client.emojis.get('EmojiİD')
let emoji3 = client.emojis.get('EmojiİD')
let emoji4 = client.emojis.get('EmojiİD') 

kanal.send(`
${emoji1} ${member} **Dostum sunucumuza hoş geldin!**
 
${emoji2} **Seninle birlikte** \`${member.guild.memberCount}\` **üyeye ulaştık!** 

${emoji3} **Hesap ${moment(user.createdAt).format('DD/MM/YYYY')} (${daysCreated}) tarihinde oluşturuldu!**

${emoji4} <@&register id> **Rolündeki sahip yetkililer seninle ilgilenicektir.**`).catch(sex=>{return});
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on("userUpdate", async(eski, yeni) => { // Tag Alınca Veya Çıkarınca Rolü Verip Alma
  if(eski.username !== yeni.username) {
  if(!yeni.username.includes("TAG") && client.guilds.get("SunucuİD").members.get(yeni.id).roles.has("RolİD")) { 
     client.guilds.get("SunucuİD").members.get(yeni.id).removeRole("RolİD") 
     client.channels.get('LogİD').send(`${yeni} **Tagımızı Çıkararak Ailemizden Ayrıldı!**`)
 }
     if(yeni.username.includes("TAG") && !client.guilds.get("SunucuİD").members.get(yeni.id).roles.has("RolİD")) {
      client.channels.get('LogİD').send(`${yeni} **Tagımızı Alarak Ailemize Katıldı!**`)
      client.guilds.get("SunucuİD").members.get(yeni.id).addRole("RolİD")
  }}
  })

/////////////////////////////////////////////////////////////////////////////////////////////////////

let log = message => {
  console.log(message)
}

let fs = require('fs');

bot.commands = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {

  if(err) console.log(err);

  let commandFile = files.filter(file => file.split(".").pop() === "js");
  if(commandFile.length <= 0) return console.log("Couldn't find commands.");

  commandFile.forEach((file, i) => {

    let props = require(`./komutlar/${file}`);

    console.log(`${file} adlı komut başarıyla yüklendi.`);

    client.commands.set(props.help.name, props);
  });
});

client.commands = bot.commands;
client.on("ready", async () => {
  console.log(`${client.user.username} ismi ile giriş ypaıldı! - Fayik Was Here!`);
});

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = ayarlar.prefix;
  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);

  if(!command.startsWith(prefix)) return;

  let commandRaw = command.split(prefix)[1];
  let commandFile = bot.commands.get(commandRaw);

 if(commandFile) {
   commandFile.run(client, message, args);
 }
});

client.login(ayarlar.token).catch(err => {
console.error('Giriş Yapamadım')
console.error(err.message)
});
