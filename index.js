

////////////////////////////////////////////////////////////////////////////////////////////////////
function agregar_carrito(e){

    console.log("Pclick" , e.target);

    let datos = e.target.parentNode.parentNode;
    
    //let padre = hijo.parentNode;
  // let abuelo = padre.parentNode;
   // console.log(padre);

    let nombre_producto = datos.querySelector("h5").textContent;
    let precio_producto = datos.querySelector("p").textContent;


    let producto = {
        nombre : nombre_producto,
        precio : precio_producto,
        cantidad : 1
    };
    Toastify ({
        text:"Producto Agregado al Carrito",
        duration: 1500
    }).showToast();

    mostrar_carrito(producto);
}




function mostrar_carrito(producto){

    let fila = document.createElement("tr");

    fila.innerHTML =    `<td>  </td>
                        <td>  </td>
                        <td> ${producto.nombre} </td>
                        <td> ${producto.cantidad} </td>
                        <td> ${producto.precio}</td>
                        <td> <button class="btn btn-danger borrar">Borrar</button></td>
                        `;

    let tabla = document.getElementById("tbody");
    tabla.append(fila);


    // BOTON BORRAR
    let btn_borrar = document.querySelectorAll(".borrar");
    for (let boton of btn_borrar){
        boton.addEventListener("click", borrar)
    }
}



//BOTON BORRA

function borrar(e){
    e.target.parentNode.parentNode.remove();
    Toastify ({
        text:"Producto Borrado del Carrito",
        duration: 1500
    }).showToast();
}









//BOTON COMPRA Captura

let boton_compra = document.querySelectorAll (".btn_compra");

console.log(boton_compra);

for (let boton of boton_compra){

    boton.addEventListener("click" , agregar_carrito);
}







//BOTON CARRITO Captura

let btn_carrito = document.getElementById("mostrar_carrito");

btn_carrito.addEventListener("click", function(){

    let carrito = document.getElementById("carrito");

    if( carrito.style.display != "none"){
        carrito.style.display = "none";
    }else{
        carrito.style.display = "block";
    }

})

