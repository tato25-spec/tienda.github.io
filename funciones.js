function cambiarTexto()     {
    document.getElementById //cambia el texto del elemento con id "textoEjemplo"//
    ("textoEjemplo").textContent="¡El texto ha sido cambiado!";
}
function mostrarOcultar()   { //obtiene el elemento con el id "oculto"//
    const parrafo= document.getElementById("Oculto");
    //cambia la visibilidad del parrafo// // si el parrafo esta ocukto, l muestra ; si esta visible, lo oculta//
    parrafo.style.display= (parrafo.style.display === "none") ? "block" : "none" ;
}
