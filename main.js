/*
This is Takumi's waifu bot
She is OP so don't try messing with her
*/
// Import the discord.js module
const Discord = require('discord.js');

// Import the configuration from the json file
const config = require('./config.json');
// Import the quotes and prefix json file
const all_prefix = require('./prefix.json');
const all_quotes = require('./quotes.json');
const fs = require('fs');
// Create an instance of a Discord client
const client = new Discord.Client();


// Assign 2 parameter
client.on("ready",function(){   
    console.log('I am ready!');
    client.user.setStatus('online');
    client.user.setGame('Eternal Lover with Takumi <3');
    client.user.setPresence({ game: { name: 'Eternal Lover with Takumi <3' , type: 0 } });

  });
  
  /*client.on('ready', () => {
    
    client.user.setGame('with her Eternal lover Takumi');
}); */

/*
client.on('setGame', status => {
    var game = {name: "with her Eternal lover Takumi"};
          client.user.setGame("online", game);
              
});*/

// Create empty array
var prefix = [];
var quotes = [];
var item;
var key;
//var help = JSON.parse(fs.readFileSync('help.txt','utf8'));

// Loop to gather all data into array

for (item in all_prefix){
    key = all_prefix[item];
    prefix.push(key);
    //console.log('anddd');
    }

for (item in all_quotes){
    //key = {[item]:all_quotes[item]};
    key = all_quotes[item];
    //console.log(quotes);
    quotes.push(key);
    }

var command = config.command;

var InfiniteLoop = require('infinite-loop');
var il = new InfiniteLoop;

// This function random output when prefix is take

function randomQuote(prefix, quotes, talk, name) {
    // message.content take input from discord
    var output;
    for (item in prefix) {
      //console.log(quotes[item]);
      //console.log('AND--');
      output = quotes[item];
      //console.log(output);
      //SHIT CODE
     if (prefix[item] == talk) {
        var a = output[Math.floor(Math.random() * output.length)]; 
                var b;
                var c;
        c = a.split(' ');
        for (b in c){
            console.log(a);
            console.log(c);
            if (c[b] == "[user]") {
                c[b] = (name);
        }
        a = c.join(' ');
            
        }
            return a;
    }
    }
}

il.add(randomQuote, []);

il.run();

// The ready event is vital, it means that your bot will only start reacting to information
// from Discord after ready is emitted


// Create an event listener for when a member joins
client.on('guildMemberAdd', member => {
    // retrieves user name from our member
    var memberName = member.toString();
    var wMessage = config.welcomeMessage.replace(config.usertext, memberName);

    if (config.welcomeChannelId) {
        var welcomeChannel = member.guild.channels.get(config.welcomeChannelId);
        if (welcomeChannel) {
            welcomeChannel.send(wMessage); 
            return;
        }
    }
    member.guild.defaultChannel.send(wMessage);
});

// Create an event listener for when a member leaves
client.on('guildMemberRemove', member => {
    // retrieves user name from our member
    var memberName = member.toString();
    var gMessage = config.goodbyeMessage.replace(config.usertext, memberName);
    if (config.welcomeChannelId) {
        var welcomeChannel = member.guild.channels.get(config.welcomeChannelId);
        if (welcomeChannel) {
            welcomeChannel.send(gMessage);
            return;
        }
    }

    member.guild.defaultChannel.send(gMessage);
});

// Response message when certain condition are met
client.on("message", (message) => {
  var begin;
  var name = message.member.toString();
  console.log(message.member.toString());
  //console.log(message);
  for (item in prefix){
    if (message.content == prefix[item])
    {
      begin = message.content;   
    }
  }
  // If message is the same with prefix then...
  if (message.content.startsWith(begin,command)) {
    var talk;
    talk = message.content;
    // Reserve words for VIP (aka NSFW)
    let modRole = message.guild.roles.find("name", "Endless Potential");
    //console.log(message .member.roles.has(modRole.id));
    console.log(message.content.startsWith('!t',command));  // True

    if (message.content.startsWith('!t',command))    {
        // Reserve TRIGGERED
        if (message.member.roles.has(modRole.id)) {
            console.log('hello admin');}   // you're admin!
        else{
            return message.reply("You are not Takumi!");}
    }
    else{
        console.log('nothing SHOULD happen');
        // nothing will happen...
    }
    //console.log('correct input',message.content);
    // send message
    message.channel.send(randomQuote(prefix,quotes,talk,name));
    return;
  }
});

  
// Assign Role NSFW
client.on("message", message => {
    console.log(message.content);
    // Works
    if(message.content == '!nsfw') { 
        let modRole = message.guild.roles.find("name", "NSFW");
        if(message.member.roles.has(modRole.id)) {
            console.log('ss');  // You already have this role!
            message.reply("ดันโจเคยขอไปแล้วจำไม่ได้หรอ เจ้าโง่!");
        } 
        else {
            // If not request to assign NSFW role
            console.log('fail');
            var role;
            role = message.guild.roles.find('name','NSFW');
            message.member.addRole(role);
            message.reply("ยืนยันคำขอเรียบร้อยค่ะ ดันโจ...คนลามก");
            
        }
    }

  
  if (message == "!help"){
  message.channel.send(
  {embed:
   {
    title:"Takumi's Waifu Help Command",
    color :0xff84fe,
      fields:[
        {
        name:" '!' + Message โต้ตอบกับ Bot (Chat Message Command) 1",
        
        value:"`สวัสดี` `ไปก่อนนะ` `ลูบหัว` `กอด` `ซึน` `เกลือ` `ได้6ดาว` `โลลิ` `เหงา` `tsundere` `salt` `hello`\n__**`pat head`**__ `hug` `get6star` `hanamomo` `goodbye`", 
        inline: true
        },
         {
        name:" '!Takumi ' + Message โต้ตอบกับ Bot (Chat Message Command) 2",
        
        value:"`นอกใจ` `กาก` __**`is shit`**__ ",     
        inline: true
       },
        {
        name:"คำสั่งอื่น ๆ Other Command",
        value:"`!nsfw  (Assign Your NSFW Role) ให้บทบาท nsfw` \n`!a (Announcement) Only Moderators can used` \n `!event (Lastest FKG Event Text)`",
         inline: true
        },
         { 
           name:"!t ' + Message โต้ตอบกับ Bot (Chat Message Command) \n Only Takumi can used",
        value:" `สวัสดี` `ไปก่อนนะ` `เกลือ` `ได้6ดาว` `รักนะ` `ลูบหัว` `กอด` \n__**`pat head`**__ `kiss` `goodbye`  `hello`",
        inline: false
        }
               ] ,
    timestamp: new Date(),
        footer : {
      text: "จาก Takumi [TH] ",
      icon_url: 'https://orig08.deviantart.net/f1f1/f/2017/225/7/2/profile_picture_by_takuminopeachblossom-dbjx0mc.jpg',
               }
             
    }
   }
  );
} // Completed
  if (message.content.startsWith ("!a")) {
        let modRole = message.guild.roles.find("name", "Moderators");
        if(message.member.roles.has(modRole.id)) {
            var announce = message.content.split(' ');
            announce.shift();
            announce = announce.join(' ');
            console.log(announce); // what is
            //var embed = new Discord.RichEmbed(announce)
            //.setColor(0x00AE86)
            //.setTimestamp()
            //.addField(`New Announcement by ${message.author.username}`, `${announce}`);
            //.addField(`${announce}`);
            //client.channels.find("name", "admin").sendEmbed(embed);
            client.channels.find("name", "general").sendMessage(`${announce}`);
            //message.channel.sendMessage(`:ok_hand: Annoucement sent to #general`);
        }
        else {
            message.channel.sendMessage("**Error:** \n You dont have permission 'Endless Potential' to announce");
            
        }
    } // Completed
}); // Completed



// Log our bot in
client.login(process.env.BOT_TOKEN);
