// User Board =[0,2,5]
module.exports = (user_board) => {
    let combinaciones = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    for(let j=0; j<combinaciones.length;j++){
        let combinacion = combinaciones[j];
        let gano = true;
        for(let i = 0; i<combinacion.length;i++){
            if(!isInArray(user_board,combinacion[i])){
                gano = false;
                break;
            }
        }
        if(gano){ return true};
    }
    return false
}


function isInArray(arr, elemento){
    return arr.indexOf(elemento) > -1;
}

