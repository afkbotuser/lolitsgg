const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// 1. WEB SERVER: Keeps the Replit container "awake"
app.get("/", (req, res) => {
  res.send("Bot is active and moving!");
});
app.listen(3000, () => console.log("Web server is running on port 3000"));

// 2. BOT CONFIGURATION
const botArgs = {
  host: 'primesmpseasons.aternos.me', // Change this
  port: 25565,
  username: 'Prime_AFK_Bot',
  version: '1.20.1' // Ensure this matches your server
};

let bot;

function createBot() {
  bot = mineflayer.createBot(botArgs);

  bot.on('spawn', () => {
    console.log("Bot spawned. Starting circle movement...");
    
    // 3. CIRCLE MOVEMENT LOGIC
    // Forces the bot to hold 'forward' and 'right' keys to walk in circles
    bot.setControlState('forward', true);
    bot.setControlState('right', true);
    bot.setControlState('jump', true); // Optional: makes it harder to kick
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    if (message === '!stop') {
        bot.clearControlStates();
        bot.chat("Stopped moving.");
    }
  });

  // Auto-reconnect logic
  bot.on('end', () => {
    console.log('Bot disconnected. Reconnecting in 10 seconds...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => console.log(`Error: ${err}`));
}

createBot();
