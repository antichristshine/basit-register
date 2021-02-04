const Discord = require('discord.js');
var db = require('quick.db');
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {

  if (message.author.id !== (ayarlar.sahip) && !message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.has("OwnerİD") && !message.member.roles.has("YöneticiİD") && !message.member.roles.has("RegisterİD")) return message.reply('**Gerekli Yetkiye Sahip Değilsin!**').then(msg => msg.delete(7000)) 
  
 let msg = message;

 let user;
  if (message.mentions.users.first()){
    user = message.mentions.users.first();
  } else if (args[0]  && !message.mentions.users.first()){
    user = message.guild.members.get(args[0])
  }
    
  let member = msg.guild.member(user);
  let kayıtsız = 'KayıtsızİD';
  let kız = 'KızİD';
  let rol = 'KızİD2';

var argumentler = message.content.split(" ");
 var isim = argumentler[2] ;
 var yas = argumentler[3];
if (!user) return message.reply(`Bir kullanıcı etiketlemelisin! @kişi/id`).then(msg => msg.delete(5000))  
if (!isim) return message.reply(`Kullanıcı adı yazmalısın.`).then(msg => msg.delete(5000))  
if (!yas) return message.reply(`Yaş belirtmediniz.`).then(msg => msg.delete(5000)) 
if (isim.length + yas.length + 3 > 32) return message.reply(`**İsim Ve Yaş 32 karakteri geçmez!**`).then(msg => msg.delete(5000))
  if(message.author.id === user.id) return message.reply("**Kendini kayıt edemezsin!**").then(msg => msg.delete(9000))   

  let uyarı = '**Bu kişi zaten kayıt olmuş!**'
  if (member.roles.has(kız)) return msg.reply(uyarı).then(msg => msg.delete(9000))  
  await member.setNickname(`${isim} | ${yas}`)

  member.removeRole(kayıtsız)
  member.addRole(kız)
  member.addRole(rol)

    let channel = message.guild.channels.get('ChatİD') //: 'Nerde bu kanal aQ';
    if (!channel) return console.log('KaNaal Yoq');
    channel.send(`${member} **Sunucumuza katıldı hoş geldin dostum!**`).catch(console.log).then(m => m.delete(7500))

 var kyoyu = new Discord.RichEmbed()
    .setColor("090e29")
    .setDescription(`~ ${member} Adlı Kullanıcı Kayıt Edildi.\n~ Kullanıcı Adı \`${member.nickname || '404'}\` Olarak Ayarlandı.`)
    .setFooter(`DevWork ❤️ Fayikcim`, message.author.avatarURL)
    .setTimestamp();
     message.channel.send(kyoyu).then(m => m.delete(7000)) 
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['Kız','kız','k'],
  permLevel: 0
};

exports.help = {
  name: 'kız',
  description: 'DevWork',
  usage: 'DevWork'
};
