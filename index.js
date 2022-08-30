
const { Client } = require('whatsapp-web.js');
const client = new Client();
const qrcode = require('qrcode-terminal');

const express = require("express")
const app = express()
const qr = require("qr-image")

app.set("view engine", "ejs")
app.get('/qrcode', (req, res) => {
    res.render("home")
});

let codeBarra;

client.on('qr', qr => {
    // qrcode.generate(qr, {small: true});
    codeBarra = qr
    
});

app.get('/', async (req, res) => {

    const code = await qr.image(codeBarra, { type: 'svg' })
    res.type('svg')
    code.pipe(res)

});

client.on('ready', () => {
    console.log('Bot Conectado!');
});

client.on('message', message => {
	if(message.body === '!b') {
		message.reply('conected');
	}
});
 

client.initialize();


app.listen(8080, () => {
    console.log('servidor rodando http://localhost:8080')

});





