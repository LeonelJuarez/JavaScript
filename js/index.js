/*const productos = [
    {
        id:"celular-01",
        nombre:"A50",
        imagen:"./img/cel/A50.jpg",
        categoria:{
                nombre: "Celulares",
                id: "celulares"
        },
        precio:80000
},
    {
        id:"celular-02",
        nombre:"A70",
        imagen:"./img/cel/A70.jpg",
        categoria:{
                nombre:"Celulares",
                id:"celulares"
        },
        precio:95000
},
    {
        id:"celular-03",
        nombre:"E40",
        imagen:"img/cel/E40.jpg",
        categoria:{
                nombre:"Celulares",
                id:"celulares"
        },
        precio:85000
},
    {
        id:"bateria-01",
        nombre:"Bateria A50",
        imagen: "./img/bat/BatA50.jpg",
        categoria:{
                nombre:"Baterias",
                id:"baterias"
        },
        precio:5000
},
    {
        id:"bateria-02",
        nombre:"Bateria A70",
        imagen:"./img/bat/BatA70.jpg",
        categoria:{
                nombre:"Baterias",
                id:"baterias"
        },
        precio:6000
},
    {
        id:"bateria-03",
        nombre:"Bateria E40",
        imagen:"./img/bat/BatE40.jpg",
        categoria:{
                nombre:"Baterias",
                id:"baterias"
        },
        precio:5500
},
    {
        id:"modulo-01",
        nombre:"Modulo A50",
        imagen:"./img/mod/moduloA50.jpg",
        categoria:{
                nombre:"Modulos",
                id:"modulos"
        },
        precio:11000
},
    {
        id:"modulo-02",
        nombre:"Modulo A70",
        imagen:"./img/mod/moduloA70.jpg",
        categoria:{
                nombre:"Modulos",
                id:"modulos"
        },
        precio: 15000
},
    {
        id:"modulo-03",
        nombre:"Modulo E40",
        imagen:"./img/mod/moduloE40.jpg",
        categoria:{
                nombre:"Modulos",
                id:"modulos"
        },
        precio:13000
}]*/

//JSON LOCAL

let productos = [];

fetch ("./js/prod.json")
.then(response => response.json())
.then(data => {
        productos = data;
        cargaProductos(productos);
})

const contenedorProductos = document.querySelector("#contenedor_productos");
const botonesCategorias = document.querySelectorAll(".btn_categoria");
const titulo = document.querySelector("#titulo");
let botonesAgregar = document.querySelectorAll(".producto_agregar");
const numero = document.querySelector("#numero");

function cargaProductos(elegido){
        contenedorProductos.innerHTML = "";

        elegido.forEach(producto => {

                const div = document.createElement("div");
                div.classList.add("producto");
                div.innerHTML = `
                <img class="producto_imagen" src=${producto.imagen} alt= ${producto.nombre}>
                <div class="producto_detalles">
                    <h3 class="producto_titulo">${producto.nombre} </h3>
                    <p class="producto_precio">$ ${producto.precio} </p>
                    <button class="producto_agregar" id=${producto.id}>AGREGAR AL  CARRITO</button>
                </div> `;

                contenedorProductos.append(div); 
                
        })

        actualizacionBtnAgregar();
        
}

cargaProductos(productos);

botonesCategorias.forEach (boton => {
        boton.addEventListener("click", (e) =>{

           /*   botonesCategorias.forEach(boton => boton.classList.remove("active"));
                e.currentTarget.classList.add("active");
               console.log("HOLA");*/


                if(e.currentTarget.id != "todos"){
                
                const cat = productos.find(productos => productos.categoria.id === e.currentTarget.id);    
                titulo.innerText = cat.categoria.nombre;

                const elegidoBtn = productos.filter(productos => productos.categoria.id === e.currentTarget.id);
                cargaProductos(elegidoBtn);

                }else{
                titulo.innerText = "Todos los Productos";
                cargaProductos(productos);
                        
                }

                
        })
});


function actualizacionBtnAgregar (){
        botonesAgregar = document.querySelectorAll(".producto_agregar");

        botonesAgregar.forEach(boton => {
                boton.addEventListener("click", agregarAlCarrito);
        })
}
let productosCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");


if (productosEnCarritoLS){
        productosCarrito = JSON.parse(productosEnCarritoLS);
        actualizarNumero();
}else{
        productosCarrito = [];
}

function agregarAlCarrito (e){

        Toastify({
                text: "Producto Agregado al Carrito",
                duration: 2000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "linear-gradient(to right, #black, #96c93d)",
                },
                onClick: function(){} // Callback after click
              }).showToast();

        const idBtn = e.currentTarget.id;
        const productoAgregado = productos.find (producto => producto.id === idBtn);

        if(productosCarrito.some (producto => producto.id === idBtn)){
       
        const index = productosCarrito.findIndex(producto => producto.id === idBtn);
        productosCarrito[index].cantidad++;
        }else{
        productoAgregado.cantidad = 1;
        productosCarrito.push(productoAgregado);        
}

actualizarNumero();

localStorage.setItem("productos-en-carrito", JSON.stringify(productosCarrito));
}


function actualizarNumero(){
        let actNumero = productosCarrito.reduce((acc, producto) => acc + producto.cantidad,0);
        numero.innerText = actNumero;

}