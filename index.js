const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// 1. WEB SERVER: This keeps Replit alive
app.get("/", (req, res) => {
  res.send("Bot is online!");
});
app.listen(3000);

// 2. MINECRAFT BOT SETTINGS
const botArgs = {
  host: 'primesmpseasons.aternos.me', // Replace with your IP
  port: 25565,                       // Usually 25565
  username: 'AFK_Bot',               // Bot's name
  version: '1.20.1'                  // Match your server version
};

let bot;

function createBot() {
  bot = mineflayer.createBot(botArgs);

  bot.on('login', () => {
    console.log(`Bot has logged in as ${bot.username}`);
  });

  // Auto-reconnect if kicked
  bot.on('end', () => {
    console.log('Bot disconnected. Reconnecting in 5 seconds...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', (err) => console.log(err));
}

createBot();
