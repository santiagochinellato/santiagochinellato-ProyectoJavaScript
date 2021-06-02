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

// ------------carrito con ajax--------------
const xhr = new XMLHttpRequest();
xhr.open("GET", "productos.json", true);
xhr.onload = function () {
  if (this.status === 200) {
    let productos = JSON.parse(this.responseText);
    localStorage.setItem("productos", JSON.stringify(productos));
    // ---------buscador---------
    const formulario = document.querySelector("#formulario");
    const boton = document.querySelector("#boton");
    let resultado = document.querySelector("#resultado");
    const filtrar = () => {
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
        <button class="btn boton-producto" onclick="location.reload(addToCart(${producto.id}))">Agregar<img
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
  }
};
xhr.send();

// ------------ fin carrito con ajax------------

let indicator = JSON.parse(localStorage.getItem("carrito"));
console.log(indicator.length);
document.getElementById("indicador").innerHTML = indicator.length;
