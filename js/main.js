// Carrito
let carrito = [];
let totalCarrito = carrito.map((carrito) => carrito.name);
let precioCarrito = carrito.reduce((acumulador, elemento) => acumulador + elemento, 0);
const catalogo = [
    {id: 1, name:"blusa", price:"16499"},
    {id: 2, name:"jean", price:"27899"},
    {id: 3, name:"camisa", price:"21299"},
    {id: 4, name:"top", price:"15899"},
    {id: 5, name:"buzo", price:"23849"},
    {id: 6, name:"pollera", price:"14199"},
    {id: 7, name:"remera", price:"11999"},
    {id: 8, name:"overol", price:"35099"},
    {id: 9, name:"short", price:"14999"},
    {id: 10, name:"pantalon", price:"30499"},
    {id: 11, name:"sueter", price:"24999"},
    {id: 12, name:"vestido", price:"29999"},
];

class Compra {
    constructor(catalogo){
        this.catalogo = catalogo
    }
    getProductById(id){
        const prodId = this.catalogo.filter( item => item.id == id);
        if (prodId){
            return prodId;
        }else{
            return "No se encontró el producto";
        }
    }
    getProductByPrice(price){
        const catalogo = this.catalogo.filter( item => item.price < price);
        return catalogo ? catalogo : "No coincide con la busqueda";
    }
    getProductByName(name){
        const nombre = this.catalogo.filter( item => item.name.toLowerCase().includes(name.toLowerCase()));
        return nombre ? nombre : "No se encontró el producto"; 
    }
}
const buscar = new Compra(catalogo);


let saludo = confirm("Bienvenido a mi tienda! ¿Desea filtrar por productos?");

while(saludo === true){
    let eleccion = prompt("¿Quiere filtrar por PRECIO, NOMBRE o ID?");
    if(eleccion == "precio"){
        const precio = prompt("Ingrese el precio máximo:");
        const filtroPrecio = buscar.getProductByPrice(precio);
        let mostrarProductoYPrecio = filtroPrecio.map(filtroPrecio => filtroPrecio.name + " - $" + filtroPrecio.price + " ");
        let productoPrecio = prompt
        (`Resultados: 
            ${mostrarProductoYPrecio}
        Agregue un producto al carrito:`);

        carrito.push(productoPrecio);
    }
    else if(eleccion === "nombre"){
        const nombre = prompt("Ingrese el nombre de la prenda:");
        const filtroPrenda = buscar.getProductByName(nombre);
        let mostrarProductoYPrecio = filtroPrenda.map((filtroPrenda) => (filtroPrenda.name + " - $" + filtroPrenda.price + " "));
        let productoNombre = prompt
        (`Resultados: 
            ${mostrarProductoYPrecio}
        Agregue un producto al carrito:`);

        carrito.push(productoNombre);
    }
    else if(eleccion == "id"){
        const id = parseInt( prompt("Ingrese el ID del producto:"));
        const filtroId = buscar.getProductById(id);
        let mostrarProductoYPrecio = filtroId.map((filtroId) => (filtroId.name + " - $" + filtroId.price + " "));
        let productoId = prompt(
        `Resultados: 
            ${mostrarProductoYPrecio}
        Agregue un producto al carrito:`);

        carrito.push(productoId);
    }
    
    else{
        let error = confirm("Por favor, ingrese el valor correctamente.");
        while(error == true){
            eleccion = prompt("¿Quiere filtrar por PRECIO, NOMBRE o ID?");
        }
        alert("Muy bien! Hasta pronto.");
        }
        
    saludo = confirm("¿Desea agregar otro producto por filtrado?");
}


alert(`Su carrito contiene: ${carrito} y suma un total de ${precioCarrito}`)
        // continuar = confirm("¿Desea agregar otro producto?");

while(saludo === false){
    let continuar = confirm("¿Quiere seguir comprando?");
    while(continuar == true){
        alert("Elija que producto desea añadir:");
        let mostrarProductos = catalogo.map((catalogo) => catalogo.name + " - $" + catalogo.price);
        let seleccionProducto = prompt(mostrarProductos.join(", "));

        let confirmacion = confirm("Ha agregado " + seleccionProducto + " al carrito. ¿Es correcto?");

        if(confirmacion === true){
            carrito.push(seleccionProducto);
        }else if (confirmacion === false){
            alert("Por favor, seleccione un producto");
            mostrarProductos = catalogo.map((catalogo) => catalogo.name);
            seleccionProducto = prompt(mostrarProductos.join(", "));
            carrito.push(seleccionProducto);
        }    
        
        alert(`Su carrito contiene: ${carrito} y suma un total de ${precioCarrito}`)
        continuar = confirm("¿Desea agregar otro producto?");
    }
    saludo = confirm("Desea salir?")
    if(saludo == true){
    alert("Muchas gracias!");
    }

}  

alert("Hasta pronto!")















































// function comprar(){
//     const addCarrito = prompt(productos.name)
// };

// comprar();

// let seguirComprando = confirm("¿Agregar al carrito?");
// let addCarrito; 

// while(seguirComprando === true){
//     addCarrito = prompt("¿Qué producto desea sumar al carrito?") ;
//     carrito.push(addCarrito);

//     seguirComprando = confirm("¿Agregar al carrito?");
// }

// for( (item) => )


// Sumar IVA
// function Productos(nombre, precio){
//     this.nombre = nombre;
//     this.precio = precio;
//     this.precioFinal = 0;

// }

// for (let i=0; i<carrito.length; i++){
//     console.log(carrito[i])
// }


