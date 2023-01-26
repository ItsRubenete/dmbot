const qrcode = require('qrcode-terminal');

const { Client, Buttons, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth(),
    purpeteer: {headless: true, args:['--no-sandbox','--disable-setuid-sandbox']}
});
const Store = require('electron-store')
const storage = new Store()

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('message', message => {
    console.log(message)
    message2(message);
    
    
});
storage.set("numbersdata."+rp("34608955749@c.us")+".asistencia.role","")
storage.set("numbersdata."+rp("34608955749@c.us")+".asistencia.estado",false )
admins = ["34608955749@c.us"]

function message2(input) {
if(storage.get("numbersdata."+rp(input.from)+".asistencia.role")==="pendiente"){
    if(storage.get("numbersdata."+rp(input.from)+".asistencia.msg")){
        storage.set("numbersdata."+rp(input.from)+".asistencia.msg",storage.get("numbersdata."+rp(input.from)+".asistencia.msg")+1)
    }else{
        storage.set("numbersdata."+rp(input.from)+".asistencia.msg",1)
    }
}else{
    if(input.body === "asmenu"){
        let botonasmenu = new Buttons('',[{body:'Pedir presupuestos'},{body:'Hablar con un agente'}],'Menú de asistencia','Gracias');
        client.sendMessage(input.from, )
    }
    if(input.body === "asoff"){
        storage.set("numbersdata."+rp(input.from)+".asistencia.estado",false)
        storage.set("numbersdata."+rp(storage.get("numbersdata."+rp(input.from)+".asistencia.who"))+".asistencia.estado",false)
        storage.set("numbersdata."+rp(input.from)+".asistencia.role","")
        storage.set("numbersdata."+rp(storage.get("numbersdata."+rp(input.from)+".asistencia.role"))+".asistencia.estado","")
        client.sendMessage(input.from, "*Asistencia finalizada*");
        client.sendMessage(storage.get("numbersdata."+rp(input.from)+".asistencia.who"), "*Asistencia finalizada*");
        
    }else{
    if(storage.get("numbersdata."+rp(input.from)+".asistencia.role")==="asistido"){
        client.sendMessage(storage.get("numbersdata."+rp(input.from)+".asistencia.who"), input.body);
    }else{
        client.sendMessage(storage.get("numbersdata."+rp(input.from)+".asistencia.who"), input.body);
    }
    }
}
    if(storage.get("numbersdata."+rp(input.from)+".asistencia.estado")){
    }else{
    if(input.fromMe === false){
    
        switch(input.body) {
          case "Pedir presupuestos":
            client.sendMessage(input.from, "Si desea pedir un presupuesto acceda a este formulario y rellene los datos https://alquilerordenadores.com/contacto");
            break;
          case "Atender":
            startsession(input)
            break;
          case "Hablar con un agente":
            client.sendMessage(input.from, "Enseguida le atendemos.");
            //client.sendMessage("34609391044@c.us", "Enseguida le atendemos.");
            storage.set("numbersdata."+rp(input.from)+".asistencia.role", "pendiente");
            storage.set("numbersdata."+rp(input.from)+".asistencia.estado", true);
            let buttons = new Buttons(input.from.replace("@c.us","") + " - " +  input._data.notifyName,[{body:'Atender'}],'Nueva petición de asistencia',input.from);
            admins.map(function(el){
                client.sendMessage(el, buttons);
            })
            break;
          default:
            let button = new Buttons('Elija una opción para continuar',[{body:'Pedir presupuestos'},{body:'Hablar con un agente'}],'Gracias por contactar con Dinamica Media','Gracias');
            client.sendMessage(input.from, button);
        }
        }
}

}

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

function startsession(input){
if(storage.get("numbersdata."+rp(input._data.quotedMsg.footer)+".asistencia.estado")){
    client.sendMessage(input.from, "Este número ya está siendo atendido");
}else{
    storage.set("numbersdata."+rp(input._data.quotedMsg.footer)+".asistencia.estado", true);
    storage.set("numbersdata."+rp(input._data.quotedMsg.footer)+".asistencia.who", input.from);
    storage.set("numbersdata."+rp(input._data.quotedMsg.footer)+".asistencia.role", "asistido");
    storage.set("numbersdata."+rp(input.from)+".asistencia.estado", true);
    storage.set("numbersdata."+rp(input.from)+".asistencia.who", input._data.quotedMsg.footer);
    storage.set("numbersdata."+rp(input.from)+".asistencia.role", "asistiendo");
    client.sendMessage(input.from, "Atendiendo a "+input._data.quotedMsg.body);
    if(storage.get("numbersdata."+rp(input._data.quotedMsg.footer)+".asistencia.msg")){
    getLastMsg(input._data.quotedMsg.footer, storage.get("numbersdata."+rp(input._data.quotedMsg.footer)+".asistencia.msg"), input.from)
    }

}
}

async function getLastMsg(a, b, c){
    console.log(b)
    let chat1 = await client.getChatById(a);
    chat1.fetchMessages({limit:b}).then((chatc) => chatc.forEach(element => client.sendMessage(c, element.body)))
}

function rp(data){
    return data.replace("@c.us","")
}