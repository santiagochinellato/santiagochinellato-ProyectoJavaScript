let devuelveValorCarrito = JSON.parse(localStorage.getItem("carrito"));
const sumarPrecioTotal = devuelveValorCarrito;
let storageProductos = JSON.parse(localStorage.getItem("productos"));

let Carrito = [];
// Carrito = devuelveValorCarrito;
function addToCart(id) {
  let productos = storageProductos.find(
    (producto) => producto.id === id
  );
  Carrito.push(productos);
  localStorage.setItem("carrito", JSON.stringify(Carrito));
}

// ----------fin agregar al carrito----------

// ----------borrar prouductos-----------

let productosTraidoDelStorage = devuelveValorCarrito;

const eliminarItemById = (id) => {
  const itemToDelete = productosTraidoDelStorage.filter((item) => {
    return item.id !== id
  });
  localStorage.setItem("carrito", JSON.stringify(itemToDelete));
  location.reload();
};
// ----------fin borrar prouductos-----------

// -----------carrito con json----------

// const agregarAlCarrito = devuelveValorCarrito;
// console.log(agregarAlCarrito);
let cardCarrito = " ";
devuelveValorCarrito.forEach((cart) => {
  return (cardCarrito += `<div class=" container productoAgregadoCard col-md-12">
        <div class="fotoCard">
          <img src=${cart.imagen} alt="" class="fotoProducto">
        </div>
        <div class="tituloYDescripcion">
          <h5 class="tituloProducto">${cart.nombre}</h5>
          <p class="textoDescripcion">${cart.descripcion}
          </p>
        </div>
        <div class="precioProducto">
          <h5 class="titulo-precio">precio</h5>
          <p class="precio-producto-card">$${cart.precio}</p>
        </div>
        <div class="cantidadCompra">
          <button class="btn btn-info botonEliminar" onclick="eliminarItemById(${cart.id})">Eliminar</button>
        </div>
      </div> `);
});

document.getElementById("Carrito").innerHTML = cardCarrito;

// -------precio total------------

let preciosProductos = sumarPrecioTotal;

const totalPrecio = preciosProductos.reduce(
  (sum, value) => (typeof value.precio == "number" ? sum + value.precio : sum),
  0
);
// console.log(totalPrecio);

document.getElementById("precioTotal").innerHTML = "$" + totalPrecio;

// ---------fin precio total---------

// -----------precio en cuotas----------

let precioFinalCuotas;
let interesEnTres = 1.1;
let interesEnSeis = 1.5;
let interesEnDoce = 2.5;
let cuotas = document
  .getElementById("selectCuotas")
  .addEventListener("change", (event) => {
    let option = event.target.value;
    console.log(event.target.value);
    if (option === "3") {
      return (document.getElementById("precioFinan").innerHTML =
        "$" +
        Math.round((precioFinalCuotas = (totalPrecio / 3) * interesEnTres)));
    }
    if (option === "6") {
      return (document.getElementById("precioFinan").innerHTML =
        "$" +
        Math.round((precioFinalCuotas = (totalPrecio / 6) * interesEnSeis)));
    }
    if (option === "12") {
      return (document.getElementById("precioFinan").innerHTML =
        "$" +
        Math.round((precioFinalCuotas = (totalPrecio / 12) * interesEnDoce)));
    }
  });

document.getElementsByName("precioFinanciado").innerHTML =
  "$" + precioFinalCuotas;
// -----------fin precio en cuotas----------
