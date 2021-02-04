const db = require('quick.db')
const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {

  if (message.author.id !== (ayarlar.sahip) && !message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.has("787008757456175157") && !message.member.roles.has("786982207125717013") && !message.member.roles.has("785566803895779339") && !message.member.roles.has("788471377157554216") && !message.member.roles.has("784565555079282698") && !message.member.roles.has("784565557181415476") && !message.member.roles.has("784565559618306060") && !message.member.roles.has("784565575649067038")) return message.react("716404735883608105") && message.reply('**Gerekli Yetkiye Sahip Değilsin!**').then(msg => msg.delete(9000)) 

 let msg = message;

 let user;
  if (message.mentions.users.first()){
    user = message.mentions.users.first();
  } else if (args[0]  && !message.mentions.users.first()){
    user = message.guild.members.get(args[0])
  }
    
  let member = msg.guild.member(user);

 var argumentler = message.content.split(" ");
 var isim = argumentler[2] ;
 var yas = argumentler[3];
 if (!user) return message.react("716404735883608105") && message.reply(`Bir kullanıcı etiketlemelisin! @kişi/id`).then(msg => msg.delete(5000))  
 if (!isim) return message.react("716404735883608105") && message.reply(`Kullanıcı adı yazmalısın.`).then(msg => msg.delete(5000))  
 if (!yas) return message.react("716404735883608105") && message.reply(`Yaş belirtmediniz.`).then(msg => msg.delete(5000)) 
 if (isim.length + yas.length + 3 > 32) return message.react("716404735883608105") && message.reply(`Takma ad 32 karakteri geçmez!`).then(msg => msg.delete(5000))
 if(message.author.id === user.id && message.react("716404735883608105")) return message.reply("Kendini kayıt edemezsin!").then(msg => msg.delete(9000))   

await member.setNickname(`△ ${isim} | ${yas}`)

const fayikcim = new Discord.RichEmbed()
    .setColor("090e29")
    .setDescription(`${member} Adlı kullanıcı İsmi \`${member.nickname || '404'}\` Olarak Ayarlandı!`)
    .setFooter(`Demon ❤️ Fayikcim`, message.author.avatarURL)
    .setTimestamp()
     message.channel.send(fayikcim).then(m => m.delete(7500))//5saniyede mesajı siler
    message.react('716406454638346300').catch()
  
}
           
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['isim','İsim','nick','Nick','n'],
  permLevel: 4
};

exports.help = {
  name: 'isim',
  kategori: 'moderasyon',
  description: 'Belirtilen kullanıcının nickini düzenler.',
  usage: 'nick @etiket <nİck>'
};