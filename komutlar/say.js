const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')

module.exports.run = async (client, message, args) => {

  if (message.author.id !== (ayarlar.sahip) && !message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.has("OwnerİD") && !message.member.roles.has("YöneticiİD") && !message.member.roles.has("RegisterİD")) return message.reply('**Gerekli Yetkiye Sahip Değilsin!**').then(msg => msg.delete(7000)) 

  const voiceChannels = message.guild.channels.filter(c => c.type === 'voice');
    var toplamEtiketliUyeler = message.guild.members.filter(member => member.user.username.includes("#2016")).size
    let çevrimiçi = message.guild.members.filter(m => m.presence.status !== "offline").size
    let count = 0;
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;

  var fayikcim = new Discord.RichEmbed()
  .setColor("090e29")
  .setDescription(`
Sesteki Üye Sayısı : ${count}
Taglı Üye Sayısı : ${toplamEtiketliUyeler}
Çevrimiçi Üye Sayısı: ${çevrimiçi}
Toplam Üye Sayısı : ${message.guild.memberCount}`)
  .setFooter(`DevWork ❤️ Fayikcim`, message.author.avatarURL)
  .setTimestamp();
   message.channel.send(fayikcim)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['SAY','Say','SaY','SAy'],
  permLevel: 0
};

exports.help = {
  name: 'say',
  description: 'kullanıcıyı susturur.',
  usage: 'say2'
};
