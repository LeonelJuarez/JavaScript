let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const cont_carrito_vacio= document.querySelector("#carrito_vacio");
const contProductos= document.querySelector("#carrito_productos");
const contCarritoAcciones= document.querySelector("#carrito_acciones");
const contCarritoComprado= document.querySelector("#carrito_comprado"); //Falta agregar
let botonEliminar = document.querySelectorAll(".carrito_producto_eliminar");
const btnVaciar = document.querySelector("#carrito_acciones_vaciar");
const total = document.querySelector("#total");
const btnComprar = document.querySelector("#carrito_acciones_comprar");

function cargaProductosCarrito(){
if(productosEnCarrito && productosEnCarrito.length>0){

    

    cont_carrito_vacio.classList.add("disabled");
    contProductos.classList.remove("disabled");
    contCarritoAcciones.classList.remove("disabled");
    contCarritoComprado.classList.add("disabled");

    contProductos.innerHTML = "";

    productosEnCarrito.forEach(producto => {

    const div = document.createElement("div");
    div.classList.add("carrito_producto");
    div.innerHTML = `
    <img class="carrito_producto_imagen" src=${producto.imagen} alt=${producto.nombre}>
    <div class="carrito_producto_titulo">
        <small>Titulo</small>
        <h3>${producto.nombre}</h3>
    </div>
    <div class="carrito_producto_cantidad">
        <small>Cantidad</small>
        <p>${producto.cantidad}</p>
    </div>
    <div class="carrito_producto_precio">
        <small>Precio</small>
        <p>${producto.precio}</p>
    </div>
    <div class="carrito_producto_subtotal">
        <small>Subtotal</small>
        <p>${producto.precio * producto.cantidad}</p>
    </div>
    <button class="carrito_producto_eliminar" 
    id=${producto.id}><i class="bi bi-trash"></i></button>`;


    contProductos.append(div);
    });
    

}else{

    cont_carrito_vacio.classList.remove("disabled");
    contProductos.classList.add("disabled");
    contCarritoAcciones.classList.add("disabled");
    contCarritoComprado.classList.add("disabled");

}
actualizacionBtnEliminar ();
actualizarTotal ();
}

cargaProductosCarrito();



function actualizacionBtnEliminar (){
    botonEliminar = document.querySelectorAll(".carrito_producto_eliminar");

    botonEliminar.forEach(boton => {
            boton.addEventListener("click", eliminarDelCarrito);
    })
    
}



function eliminarDelCarrito(e){
    const idBtn = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBtn);
    
    productosEnCarrito.splice(index, 1);
    cargaProductosCarrito();

    localStorage.setItem("productos-en-carrito" , JSON.stringify(productosEnCarrito));
    
    Toastify({
        text: "Producto BORRADO DEL CARRITO",
        duration: 2000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, black, red)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
}

btnVaciar.addEventListener("click" , vaciar);

function vaciar(){

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito" , JSON.stringify(productosEnCarrito));
    cargaProductosCarrito();
    Toastify({
        text: "carrito vaciado",
        duration: 2000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, black, red)",
        },
        onClick: function(){} // Callback after click
      }).showToast();

}

function actualizarTotal (){
    const cal = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText =  `$${cal}`;

}

btnComprar.addEventListener("click" , comprar);

function comprar(){

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito" , JSON.stringify(productosEnCarrito));
    
    cont_carrito_vacio.classList.add("disabled");
    contProductos.classList.add("disabled");
    contCarritoAcciones.classList.add("disabled");
    contCarritoComprado.classList.remove("disabled");
}