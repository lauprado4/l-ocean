// Carrito

let carrito = [];
const productos = [
    {name:"blusa", price:"16499"},
    {name:"jean", price:"27899"},
    {name:"camisa", price:"21299"},
    {name:"top", price:"15899"},
    {name:"buzo", price:"23849"},
    {name:"pollera", price:"14199"},
    {name:"remera", price:"11999"},
    {name:"overol", price:"35099"},
    {name:"short", price:"14999"},
    {name:"pantalon", price:"30499"},
    {name:"sueter", price:"24999"},
    {name:"vestido", price:"29999"},
];

let saludo = confirm("Bienvenido a mi tienda! ¿Desea agregar un producto al carrito?")

while(saludo === true){
    alert("Elija que producto desea añadir:")
    let mostrarProductos = productos.map((productos) => productos.name);
    let seleccionProducto = prompt(mostrarProductos.join(", "));

    let confirmacion = confirm("Ha agregado " + seleccionProducto + " al carrito. ¿Es correcto?")

    if(confirmacion === true){
        carrito.push(seleccionProducto);
    }else if (confirmacion === false){
        alert("Por favor, seleccione un producto")
        mostrarProductos = productos.map((productos) => productos.name);
        seleccionProducto = prompt(mostrarProductos.join(", "));
        carrito.push(seleccionProducto);
    }    
    
    saludo = confirm("¿Desea agregar otro producto?")
}

let totalCarrito = carrito.map((carrito) => carrito.name);
let precioCarrito = carrito.reduce((acumulador, elemento) => acumulador + elemento.price, 0);
let mostrarCarrito = alert(`Su carrito contiene: ${carrito} y suma un total de ${precioCarrito}`)

















































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


