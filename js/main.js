const modal = new bootstrap.Modal("#carritoModal", {});
const listaProductos = document.querySelector("#product-list");
const botonCarritoTotal = document.querySelector("#boton-carrito-total");
const sumaTotalCarrito = document.querySelector("#sumaTotalCarrito");
const inputFilter = document.querySelector("#inputFilter")
const prodFilter = document.querySelector("#prodFilter")
const botonFav = document.querySelector("#boton-fav");
const carritoInfo = document.querySelector(".product-item");
const modalListProducts = document.querySelector("#modalListProducts");
const botonFinalizarCompra = document.querySelector("#boton-finalizar-compra");


const option1 = document.querySelector("#option1");
const option2 = document.querySelector("#option2");
const option3 = document.querySelector("#option3");
const option4 = document.querySelector("#option4");
const option5 = document.querySelector("#option5");

let carrito = [];
let totalCarrito = carrito.map((carrito) => carrito.name);

const catalogo = [
    {id: 1, name:"Blusa", price:"16.499", img:"../assets/img/blusa.webp", category:"arriba"},
    {id: 2, name:"Jean", price:"27.899", img:"../assets/img/jean.jpg", category:"abajo"},
    {id: 3, name:"Camisa", price:"21.299", img:"../assets/img/camisa.jpeg", category:"arriba"},
    {id: 4, name:"Top", price:"15.899", img:"../assets/img/top.jpg", category:"arriba"},
    {id: 5, name:"Buzo", price:"23.849", img:"../assets/img/buzo.jpeg", category:"arriba"},
    {id: 6, name:"Pollera", price:"16.199", img:"../assets/img/pollera.jpg", category:"abajo"},
    {id: 7, name:"Remera", price:"11.999", img:"../assets/img/remera.jpg", category:"arriba"},
    {id: 8, name:"Overol", price:"35.099", img:"../assets/img/overol.jpg", category:"arriba"},
    {id: 9, name:"Short", price:"14.999", img:"../assets/img/short.webp", category:"abajo"},
    {id: 10, name:"Pantalon", price:"30.499", img:"../assets/img/pantalon.jpg", category:"abajo"},
    {id: 11, name:"Sueter", price:"24.999", img:"../assets/img/sueter.jpg", category:"arriba"},
    {id: 12, name:"Vestido", price:"29.999", img:"../assets/img/vestido.jpg", category:"arriba"},
];

// CARRITO DE COMPRAS

class Cart {
    constructor( list = []){
        this.cart = list;
    }
    
    agregarCarrito( {id, name, price}){
        // veo si existe el producto
        const index = this.cart.findIndex(product => product.id == id);
        if(index == -1){
            this.cart.push( {id, name, price, stock: 1})
        }
        else{
            this.cart[index].stock++ 
        }
        
        // this.cart.push(product);
    };

    obtenerProductos(){
        return this.cart;
    }
    
    cantidadCarrito(){
        const count = this.cart.reduce( (cantidad, product) => {return cantidad + product.stock}, 0)
        return count;
    };
    
    obtenerSumaTotal(){
        const sum = this.cart.reduce( (acumulador, product) => {return acumulador + (product.price * product.stock)}, 0)
        return sum;
    };
    
}
const cart = new Cart()

botonCarritoTotal.addEventListener('click', () => {
    const list = cart.obtenerProductos();
    renderCart(list);
    sumaTotalCarrito.innerText = cart.obtenerSumaTotal().toFixed(3);
    modal.show()
    compraExitosa();
})


// RENDERIZADO DE PRODUCTOS
const renderProducts = (list) => {
    listaProductos.innerHTML = "";
    list.forEach(product => {
        listaProductos.innerHTML+= //html
        `<div>
        <a class="product-link">
        <img class="product-img" src=${product.img} alt="${product.name}">
        <div class="product-box">
        <div class="product-item">
        <p class="product-name">${product.name}</p>
        <p class="product-price">$${product.price}</p>
        </div>
        <div class="product-action">
        <button  type="button" class="product-cart btnAdd">
        <img id=${product.id} src="../assets/img/cart2.svg" title="Agregar al carrito"
        alt="Icono de Carrito">
        </button>
        <button type="button" id="boton-favoritos" class="product-wishlist">
        <img src="../assets/img/heart2.svg" title="Agregar a la lista de deseados"
        alt="Icono de deseados">
        </button>
        </div>
        </div>
        </a>
        </div>`;
    });
    
    // FUNCION BOTON AGREGAR AL CARRITO
    const botonAddCarrito = document.querySelectorAll(".btnAdd");
    botonAddCarrito.forEach(btn => {
        btn.addEventListener("click", agregarCarrito);
    });
    
    
};

// FUNCION AGREGAR AL CARRITO
const agregarCarrito = (e) => {
    const id = e.target.id;
    const encontrarProducto = catalogo.find( item => item.id == id );
    console.table(encontrarProducto)
    
    Toastify({
        text: "Producto agregado al carrito",
        className: "success",
        close: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
      }).showToast();

    cart.agregarCarrito(encontrarProducto);
};
renderProducts(catalogo);

// FILTRO POR BUSQUEDA MANUAL
inputFilter.addEventListener('input', (event) => {
    const search = inputFilter.value;
    const filtro = catalogo.filter( (product) => product.name.toLowerCase().includes(search.toLowerCase()));

    renderProducts(filtro)
}) 

// FILTRO POR CATEGORIA
prodFilter.addEventListener("change", (event) => {
    const seleccion = event.target;
    if (seleccion == "Precio más bajo"){
        const filtroCategoria = catalogo.sort( (a, b) => {
            if(a.price < b.price){return -1};
            
            if(a.price > b.price){return 1};
    
            return 0;
        })
        renderProducts(filtroCategoria);
    }
    else if (seleccion == "Precio más alto"){
        const filtroCategoria = catalogo.sort( (a, b) => {
            if(a.price > b.price){return -1};
            
            if(a.price < b.price){return 1};
    
            return 0;
        })
        renderProducts(filtroCategoria);
    }
    
}); 

// FILTRO PARTES DE ARRIBA Y ABAJO
prodFilter.addEventListener('change', (event) => {
    const nuevoFiltro = catalogo.filter( product => product.category === "arriba");
    renderProducts(nuevoFiltro);
});

prodFilter.addEventListener('change', (event) => {
    const nuevoFiltro = catalogo.filter( product => product.category === "abajo");
    renderProducts(nuevoFiltro);
});

// FILTRO MOSTRAR TODO


// RENDERIZADO DEL CARRITO
const renderCart = (list) => {
    modalListProducts.innerHTML = "";
    list.forEach(product => {
        const round = (product.price * product.stock).toFixed(3);
        modalListProducts.innerHTML += //html
        `
        <tr>
            <td>${product.stock}</td>
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td>$${round}</td>
        </tr>`
    })
}

// BOTON FINALIZAR COMPRA
const compraExitosa = () => {
    botonFinalizarCompra.addEventListener("click", () => {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Tu compra ha sido aprobada. ¡Muchas gracias!",
            showConfirmButton: false,
            timer: 2000
          });
          modal.hide();
    })
}




































// // CONSTRUCTOR DE FILTROS
// class Compra {
//     constructor(catalogo){
//         this.catalogo = catalogo
//     }
//     getProductById(id){
//         const prodId = this.catalogo.filter( item => item.id == id);
//         if (prodId){
//             return prodId;
//         }else{
//             return "No se encontró el producto";
//         }
//     }
//     getProductByPrice(price){
//         const catalogo = this.catalogo.filter( item => item.price < price);
//         return catalogo ? catalogo : "No coincide con la busqueda";
//     }
//     getProductByName(name){
//         const nombre = this.catalogo.filter( item => item.name.toLowerCase().includes(name.toLowerCase()));
//         return nombre ? nombre : "No se encontró el producto"; 
//     }
// }

// const buscar = new Compra(catalogo);


// function funcionCarrito(){
    //     let saludo = confirm("Bienvenido a mi tienda! ¿Desea filtrar por productos?");
    
//     while(saludo === true){
//     let eleccion = prompt("¿Quiere filtrar por PRECIO, NOMBRE o ID?");
//     if(eleccion == "precio"){
//         const precio = prompt("Ingrese el precio máximo:");
//         const filtroPrecio = buscar.getProductByPrice(precio);
//         let mostrarProductoYPrecio = filtroPrecio.map(filtroPrecio => filtroPrecio.name + " - $" + filtroPrecio.price + " ");
//         let productoPrecio = prompt
//         (`Resultados: 
//             ${mostrarProductoYPrecio}
//         Agregue un producto al carrito:`);

//         carrito.push(productoPrecio);
//     }
//     else if(eleccion === "nombre"){
//         const nombre = prompt("Ingrese el nombre de la prenda:");
//         const filtroPrenda = buscar.getProductByName(nombre);
//         let mostrarProductoYPrecio = filtroPrenda.map((filtroPrenda) => (filtroPrenda.name + " - $" + filtroPrenda.price + " "));
//         let productoNombre = prompt
//         (`Resultados: 
//             ${mostrarProductoYPrecio}
//         Agregue un producto al carrito:`);

//         carrito.push(productoNombre);
//     }
//     else if(eleccion == "id"){
//         const id = parseInt( prompt("Ingrese el ID del producto:"));
//         const filtroId = buscar.getProductById(id);
//         let mostrarProductoYPrecio = filtroId.map((filtroId) => (filtroId.name + " - $" + filtroId.price + " "));
//         let productoId = prompt(
//         `Resultados: 
//             ${mostrarProductoYPrecio}
//         Agregue un producto al carrito:`);

//         carrito.push(productoId);
//     }
    
//     else{
//         let error = confirm("Por favor, ingrese el valor correctamente.");
//         while(error == true){
//             eleccion = prompt("¿Quiere filtrar por PRECIO, NOMBRE o ID?");
//         }
//         alert("Muy bien! Hasta pronto.");
//         }
        
//     saludo = confirm("¿Desea agregar otro producto por filtrado?");
// }


// alert(`Su carrito contiene: ${carrito} y suma un total de ${precioCarrito}`)
//         // continuar = confirm("¿Desea agregar otro producto?");

// while(saludo === false){
//     let continuar = confirm("¿Quiere seguir comprando?");
//     while(continuar == true){
//         alert("Elija que producto desea añadir:");
//         let mostrarProductos = catalogo.map((catalogo) => catalogo.name + " - $" + catalogo.price);
//         let seleccionProducto = prompt(mostrarProductos.join(", "));

//         let confirmacion = confirm("Ha agregado " + seleccionProducto + " al carrito. ¿Es correcto?");

//         if(confirmacion === true){
//             carrito.push(seleccionProducto);
//         }else if (confirmacion === false){
//             alert("Por favor, seleccione un producto");
//             mostrarProductos = catalogo.map((catalogo) => catalogo.name);
//             seleccionProducto = prompt(mostrarProductos.join(", "));
//             carrito.push(seleccionProducto);
//         }    
        
//         alert(`Su carrito contiene: ${carrito} y suma un total de ${precioCarrito}`)
//         continuar = confirm("¿Desea agregar otro producto?");
//     }
//     saludo = confirm("Desea salir?")
//     if(saludo == true){
//     alert("Muchas gracias!");
//     }

// } 

// alert("Hasta pronto!")
// }



// LISTA DE DESEADOS

// botonFav.addEventListener("click", funcionFavoritos)














































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


