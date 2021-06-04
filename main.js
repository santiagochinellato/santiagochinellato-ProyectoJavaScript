// ------------------modal-------------
$("#myModal").on("shown.bs.modal", function () {
  $("#myInput").trigger("focus");
});

// ----------- modo oscuro------------

$(".checkbox").click(function () {
  if ($("input.checkbox").is(":checked")) {
    $(".theme").attr("href", "dark-theme.css");
    window.localStorage.setItem("href", "dark-theme.css");
  } else {
    $(".theme").attr("href", "light-theme.css");
    window.localStorage.setItem("href", "light-theme.css");
  }
  if (window.localStorage.getItem("href") !== undefined) {
    $(".theme").attr("href", window.localStorage.getItem("href"));
    console.log(window.localStorage.getItem("href"));
  }
});
// -------------------fin modo oscuro-----------

// ------------carrito con ajax--------------
let prodcutosArray = [];
fetch("https://ecommerce-40a85-default-rtdb.firebaseio.com/productos.json")
  .then((res) => res.json())
  .then((productos) => {
    return localStorage.setItem("productos", JSON.stringify(productos));
  });

// ---------buscador---------
const formulario = document.querySelector("#formulario");
const boton = document.querySelector("#boton");
let resultado = document.querySelector("#resultado");
const filtrar = () => {
  const productos = JSON.parse(localStorage.getItem("productos"));
  resultado.innerHTML = " ";
  if (resultado.innetHTML === "") {
  } else {
    const texto = formulario.value.toLowerCase();
    for (let producto of productos) {
      let categoria = producto.nombre.toLowerCase();
      if (categoria.indexOf(texto) !== -1) {
        resultado.innerHTML += `
  <div class=" row col-3 card">
    <div class="contenedor-img">
      <img src=${producto.imagen} alt="" class="img-producto">
    </div>
    <h5 class="titulo-producto">${producto.nombre}</h5>
    <p class="descripcion-producto">${producto.descripcion}</p>
    <p class="precio-producto"> $${producto.precio}</p>
    <button class="btn boton-producto" onclick="addToCart(${producto.id})">Agregar<img
        src="./images/carrito-de-compra.png" alt="" class="icono"></button>
  </div> `;
      }
    }
  }
  if (resultado.innerHTML === " ") {
    resultado.innerHTML += `<h2 class="texto-busqueda">producto no encontrado</h2>`;
  }
};
boton.addEventListener("click", filtrar);
formulario.addEventListener("keyup", filtrar);

filtrar();
// --------finbuscador-------

// ------------ fin carrito con ajax------------

let indicator = JSON.parse(localStorage.getItem("carrito"));
document.getElementById("indicador").innerHTML = indicator.length;

// ---------------carrito menu--------------------

const agregarAlCarritoMenu = JSON.parse(localStorage.getItem("carrito"));

let CartCarritoMenu = " ";
agregarAlCarritoMenu.forEach((cardMenu) => {
  return (CartCarritoMenu += `<div  class="card-carrito-menu col-12">
                <img class=" col-12 foto-carrito-menu" src=${cardMenu.imagen} alt="">
                <h6 class="titulo-carrito-menu">${cardMenu.nombre} </h6>
                <p class="precio-carrito-menu">$${cardMenu.precio} </p>
                <button class="btn btn-info boton-Eliminar-Menu" onclick="eliminarItemById(${cardMenu.id})">X</button>
              </div>`);
});
document.getElementById("productosCarritoMenu").innerHTML = CartCarritoMenu;

// --------------- fin carrito menu--------------------
