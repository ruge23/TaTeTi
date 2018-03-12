const express = require('express')
const socket_io = require('socket.io')
const evaluator = require('./evaluator.js')

const app = express()
const io = socket_io()

let posiciones_ocupadas = {};
let turno = true;

let figure = true

//accseso a los metodos de socket
app.io = io

io.on("connection", (socket) =>{
    console.log("Se conecto un nuevo cliente")

    posiciones_ocupadas = {};
    socket.broadcast.emit("reset",{})

    //envio un mensaje
    socket.emit("init",{figure:figure})
    socket.figure = figure;
    socket.user_board =[];
    
    figure = !figure;


    socket.on("nuevo_movimiento", (data)=>{
        // data.posicion => 0,1,2,3,4...8
        //posiciones_ocupadas ["0"] = true
        //data.posicion = 0
        //posiciones _ocupadas["0"]
        
        if(!posiciones_ocupadas[data.posicion]){
            
            //Evaluar si es tu turno
            if(turno == socket.figure){
                // Agregamos el movimiento al tablero del usuario
                socket.user_board.push(parseInt(data.posicion));
                
                // Marcamos la posicion como ocupada y enviamos el movimiento
                posiciones_ocupadas[data.posicion] = true;
                
                //avisar a todos que alguien movio
                io.emit("alguien_movio",{posicion: data.posicion, figura: socket.figure});    
                
                // Evaluamos si el usuario gano
                var evaluacion_del_tablero = evaluator(socket.user_board); //=> true/false
                console.log('Resultado '+evaluacion_del_tablero+" tablero: "+socket.user_board);
                
                if(evaluacion_del_tablero){
                    console.log("Alguien Gano")
                    io.emit("wow",{figure: socket.figure})
                }

                turno = !turno;
            }else{
                socket.emit("no_te_toca",{});
            }

        }else{
            console.log("alguien tiro en una posicion ocupada")
        }
    })
})


/*Se emite a todas las socket
    io.emit()
*/
/*a una sola persona
    //socket.emit("init/aquien");
*/

module.exports = app;



