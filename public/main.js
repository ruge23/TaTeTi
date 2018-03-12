//CONTROLADOR

/**
 * true => x
 * falso => 0
*/

(function(){
    
    function $(selector){
        return document.querySelector(selector);    
    }

    function jugar(seleccionado){
        if(true){
            seleccionado.innerHTML = "X"
        }else{
            seleccionado.innerHTML = "0"
        }
    }

    function definir_eventos(){
        let elements = document.querySelectorAll(".tateti-element")
    //    console.log(elements)

        for(let i=0; i<elements.length;i++){
            let element = elements[i];

            element.addEventListener("click", function(){
                let position = this.id.split("-")[1];
                socket.play(position);
            })
        }
    }

    function build_tateti(){
        for(let i =0; i<9; i++){
            let item = build_item(i);
            
            $("#tateti").innerHTML += item;
        }

        definir_eventos();
    }

    function build_item(i){
        return "<div class='tateti-element col-xs-4' id='elemento-"+i+"'></div>";
    }

    function convertir_a_figura(bandera){
        if(bandera){
            return "X";
        }
        return "0";
    }

    function reset(){
        //sweetAlert
        swal("Alguien Ingreso", "Reiniciaremos el Tablero")
        
        let elements = document.querySelectorAll(".tateti-element")
        for(var i =0; i<elements.length; i++){
            elements[i].innerHTML = " ";
        }
    }
    
    build_tateti();
    
    var socket = new Socket(function(figura){
            var figura_string = convertir_a_figura(figura)
            //sweetAlert
            swal(figura_string + " - ¡Gano la Partida!")
        },function(figura,posicion){
            $("#message").innerHTML = " Es el turno de las "+convertir_a_figura(!figura);         
            $("#elemento-"+posicion).innerHTML = convertir_a_figura(figura);
        },function() {
            reset();
        },function(){
            swal("No es tu Turno","Espera hasta que el otro jugador Tire!")
        },function(figura){
            if(figura == "X"){
                $("#message").innerHTML += " <br> Es tu turno";         
            }else{
                $("#message").innerHTML += " <br> No es tu turno";
            }
        }
    )
})()

