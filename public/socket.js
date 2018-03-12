function Socket(gano, nueva_jugada, reiniciar, no_te_toca, conexion){
    let juego = false;
    const socket = io();
    const self = this;

    self.play = function(posicion){
        socket.emit("nuevo_movimiento",{posicion: posicion})
    }

    self.figura = () => {
        if(self.juego){
            return "X";
        }
        return "0";
    }
    //para conectarse con socket
    socket.on("connect", ()=>{
        //recibo el mensaje
        socket.on("init", (data)=>{
            self.juego =data.figure;
            conexion(self.figura())
        })

        socket.on("alguien_movio", (data) =>{
            //console.log(data)
            nueva_jugada(data.figura, data.posicion)
        })

        socket.on("wow",(data)=>{
            //console.log(data)
            var figura = data.figure;
            gano(figura)
        })

        socket.on("no_te_toca",(data)=>{
            no_te_toca();
        })

        socket.on("reset",()=>{
            reiniciar()
        })

       
    })
}