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
const upperParts = document.querySelector("#upperParts");
const lowerParts = document.querySelector("#lowerParts");
const lowestPrice = document.querySelector("#lowestPrice");
const highestPrice = document.querySelector("#highestPrice");
const cantidadProducto = document.querySelector(".cantidadProducto")
const containerSumaTotal = document.querySelector("#container-suma-total") 

const memoria = JSON.parse(localStorage.getItem("carrito"));

let listaCatalogo = [];

const option1 = document.querySelector("#option1");
const option2 = document.querySelector("#option2");
const option3 = document.querySelector("#option3");
const option4 = document.querySelector("#option4");
const option5 = document.querySelector("#option5");

let carrito = [];
let totalCarrito = carrito.map((carrito) => carrito.name);



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

    guardarCarrito(){
        localStorage.setItema("carrito", JSON.stringify(this.cart));
    }

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
    
    incrementarCantidad(id){
        const index = this.cart.findIndex((product) => product.id == id);
        if (index !== -1){
            this.cart[index].stock++;
        }
        this.guardarCarrito();
    };
    
    decrementarCantidad(id){
        const index = this.cart.findIndex((product) => product.id == id);
        if (index !== -1 && this.cart[index].stock > 1){
            this.cart[index].stock--;
        }
        this.guardarCarrito();
    };
    
    eliminarProductoDelCarrito(id){
        const index = this.cart.findIndex((product) => product.id == id);
        if (index !== -1){
            this.cart.splice(index, 1)
        }
        this.guardarCarrito();
    }  
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



// RENDERIZADO DEL CARRITO
const renderCart = (list) => {
    const memoria = JSON.parse(localStorage.getItem("carrito"));
    modalListProducts.innerHTML = "";
    list.forEach(product => {
        const round = (product.price * product.stock).toFixed(3);
        modalListProducts.innerHTML += //html
        `
        <tr>
            <td>
                <div class="contenedor-cantidad">
                    <button class="restarCantidad" id=${product.id}>-</button>
                    <span class="cantidadProducto" id=${product.id}>${product.stock}</span>
                    <button class="sumarCantidad" id=${product.id}>+</button>
                </div>
            </td>
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td>$${round}</td>
            <td>
            <span class="material-symbols-outlined btn-eliminar" id=${product.id}>cancel</span>
            </td>
        </tr>
        `

        const eliminarProducto = () => {
            document.querySelectorAll(".btn-eliminar");
            eliminarProducto.forEach(btn => {
            btn.addEventListener("click", () => {
                eliminarProductoDelCarrito();
            })
        })
        } 
        eliminarProducto();
    
       
        const eliminarProductoDelCarrito = (e) => {
            const id = e.target.getAttribute("id");
            console.log(id)
            cart.eliminarProductoDelCarrito(id);
            actualizarCarrito();
        };
        
        const incrementarODecrementar = (btn, action) => {
            const id = btn.getAttribute("id");
            if (action === "incrementar"){
                cart.incrementarCantidad(id);
            }else if (action === "decrementar"){
                cart.decrementarCantidad(id);
            }
            actualizarCarrito()
        };
        
        const actualizarCarrito = () => {
            renderCart(cart.obtenerProductos());
            cantidadProducto.innerText = cart.cantidadCarrito();
            sumaTotalCarrito.innerText = cart.obtenerSumaTotal();
        };

        eliminarProducto();
        
        
        
        const restarCantidad = document.querySelectorAll(".restarCantidad");
        restarCantidad.forEach(btn => {
            btn.addEventListener("click", () => {
                incrementarODecrementar(btn, "decrementar")
            })
        });
        
        const sumarCantidad = document.querySelectorAll(".sumarCantidad");
        sumarCantidad.forEach(btn => {
            btn.addEventListener("click", () => {
                incrementarODecrementar(btn, "incrementar");                 
            })
            console.log(product.stock) 
        });
        
       
    })

                        
    

    localStorage.setItem("carrito", JSON.stringify(list));
    // console.log(list)
}




// FUNCION AGREGAR AL CARRITO
const agregarCarrito = (e) => {
    const id = e.target.id;
    const encontrarProducto = listaCatalogo.find( item => item.id == id );
    
    Toastify({
        text: "Producto agregado al carrito",
        className: "success",
        duration: 1000,
        close: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();

    cart.agregarCarrito(encontrarProducto);
   
};
// renderProducts(catalogo);





// RENDERIZADO CATEGORIAS
const renderCategories = (list) => {
    prodFilter.innerHTML = '';
    list.forEach( categoria =>{
        prodFilter.innerHTML += //html 
        `<option value="${categoria.id}">${categoria.name}</option>`
    } )
}

// FILTRO POR CATEGORIAS
function filterParts(){
    prodFilter.addEventListener('change', () => {
        let seleccion = prodFilter.value;
        if (seleccion == "1"){
            const nuevoFiltro = listaCatalogo.filter( product => product.category == "arriba");
        renderProducts(nuevoFiltro);
        }
        else if (seleccion == "2"){
            const nuevoFiltro = listaCatalogo.filter( product => product.category == "abajo");
        renderProducts(nuevoFiltro);
        }
        else if (seleccion == "3"){
            const filtroCategoria = listaCatalogo.sort( (a, b) => {
                if(a.price > b.price){return -1};
                if(a.price < b.price){return 1};
                return 0;
            })
            renderProducts(filtroCategoria);
        }
        else if (seleccion == "4"){
            const filtroCategoria = listaCatalogo.sort( (a, b) => {
                if(a.price < b.price){return -1};
                if(a.price > b.price){return 1};
                return 0;
            })
            renderProducts(filtroCategoria);
        }
        else{
            renderProducts(listaCatalogo)
        }    
    });
}
filterParts();

// FILTRO POR BUSQUEDA MANUAL
inputFilter.addEventListener('input', (event) => {
    const search = inputFilter.value;
    const filtro = catalogo.filter( (product) => product.name.toLowerCase().includes(search.toLowerCase()));

    renderProducts(filtro)
}) 




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





// FETCH Y AJAX
const obtenerCatalogo = async () => {
    try {
       const endPoint = '../js/info.json';  //aca va la url real ej: http://blabla
       const resp = await fetch(endPoint);
       const json = await resp.json()

       const products = json.catalogo;
       const categories = json.categorias;
       listaCatalogo = products;
       
       renderProducts(products);
       renderCategories(categories);

    } catch (error) {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "¡Ocurrió un error!",
            showConfirmButton: true,
            // timer: 2000
        });
        console.log("fetch no ha respondido correctamente")
    }
    
}

obtenerCatalogo();














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


