const qrcode = require('qrcode-terminal');

const { Client, Buttons, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth(),
    purpeteer: {headless: true, args:['--no-sandbox','--disable-setuid-sandbox']}
});
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('message', message => {
    console.log(message)
    client.sendMessage(message.from, message.body);
    
    
});


client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();
