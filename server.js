const express = require('express');
const http = require('http');
const app = require('./socket_express')


//servidor de archivos estaticos
app.use("/static", express.static("public"));

app.get('/', (req, res) => {
    res.sendFile("index.html",{"root":__dirname});
})
const server = http.createServer(app);

//enlace con servidor http
app.io.attach(server)


server.listen(3000);