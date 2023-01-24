class Celulares{

    constructor ( marca, precio ,stock){
        
        this.marca=marca;
        this.precio=precio;
        this.stock=stock;

    }

    get_datos(){
        console.log("<------------>")
        console.log("Nombre:", this.marca);
        console.log("Precio" ,this.precio);
        console.log("Stock:" ,this.stock);
        console.log("");
    }

    get_stock(){
        if (this.stock <= 0){
        return false;
    }else{
        return true;
    }
}
  
    update_stock(cantidad){
        if(this.stock>=cantidad){
            this.stock = this.stock - cantidad;
            return true;
        }else{
            console.log("Stock Bajo");
            return false;
        }
    }


}

//ALTA PRODUCTOS

let lista_celulares = [] ;
lista_celulares.push (new Celulares("Samsung A50",70000,20));
lista_celulares.push (new Celulares("Samsung A75",80000,10));
lista_celulares.push (new Celulares("Motorola E32",75000,12));
lista_celulares.push (new Celulares("Motorola G100",95000,5));

lista_celulares.push(new Celulares("Bateria A50",5000,10));
lista_celulares.push(new Celulares("Bateria A75",6000,7));
lista_celulares.push(new Celulares("Bateria E32",4000,6));
lista_celulares.push(new Celulares("Bateria G100",5000,2));

console.log (lista_celulares);

//FIN ALTA

//RENDER
for (let celulares of lista_celulares){
    celulares.get_datos();
}


//FIN RENDER

//COMPRA

function buscar (celulares){

    return celulares.marca == compra;
}


let compra = prompt ("QUE DESEAS COMPRAR?");

let resultado  = lista_celulares.find(buscar);

console.log(resultado);






if (resultado != undefined ) {

    //COMPRA
    
    if (resultado.get_stock()){
        let unidades = prompt("Cuantas deseas comprar?");
    
    
        if(resultado.update_stock (unidades)){

                console.log("Compra realizadad con exito");

            }else{
                   

                console.log("No se puede realizar la compra");
                
        }

    }

}else{
    console.log("PRODUCTO NO ENCONTRADO");
}








