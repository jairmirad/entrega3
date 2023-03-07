const toggleButton = document.querySelector(".navbar-toggle");
const navbarMenu = document.querySelector(".navbar-menu");

toggleButton.addEventListener("click", () => {
    navbarMenu.classList.toggle("active");
});
const productos = [
    {
        id: "pelota2023",
        titulo: "Pelota mundial 2023",
        imagen: "./media/pelota2023.jpg",
        categorias: {
            nombre: "pelotas",
            id: "pelotas",
        },
        precio: 5000,
        cantidad: 1,
    },
    {
        id: "remera-francia",
        titulo: "Remera Francia",
        imagen: "./media/camisetafr.jpg",
        categorias: {
            nombre: "Remeras",
            id: "Remeras",
        },
        precio: 8500,
        cantidad: 1,
    },
    {
        id: "remera-pumas",
        titulo: "Remera Pumas 2019",
        imagen: "./media/remera-pumas.jpg",
        categorias: {
            nombre: "Remeras",
            id: "Remeras",
        },
        precio: 12000,
        cantidad: 1,
    },
    {
        id: "remera-pumas-alternativa",
        titulo: "Remera Pumas alternativa 2019",
        imagen: "./media/remera-pumas-alt.jpg",
        categorias: {
            nombre: "Remeras",
            id: "Remeras",
        },
        precio:12000,
        cantidad: 1,
    },
    {
        id: "remera-jaguares",
        titulo: "Remera Jaguares 2018",
        imagen: "./media/remera.jpg",
        categorias: {
            nombre: "Remeras",
            id: "Remeras",
        },
        precio: 11000,
        cantidad: 1,
    },
    {
        id: "short-escocia",
        titulo: "Short Escocia",
        imagen: "./media/shortesc.png",
        categorias: {
            nombre: "short",
            id: "short",
        },
        precio: 4500,
        cantidad: 1,
    },
    {
        id: "Pelota-super-rugby-2018",
        titulo: "Pelota SuperRugby 2018",
        imagen: "./media/pelotasuperr.jpg",
        categorias: {
            nombre: "pelotas",
            id: "pelotas",
        },
        precio: 5000,
        cantidad: 1,
    },
];
const iceContent = document.getElementById("ice-content");
const verCarrito = document.getElementById("verCarrito");
const modalContent = document.getElementById("modal-content");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

productos.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
        <img  src="${product.imagen}">
        <h3>${product.titulo}</h3>
        <p class="precio">${product.precio}</p>
        `;
    iceContent.append(content);
    let comprar = document.createElement("button");
    comprar.innerText = "comprar";
    comprar.className = "comprar";

    content.append(comprar);

    comprar.addEventListener("click", () => {
        const repeat = carrito.some(
            (repeatProduct) => repeatProduct.id === product.id
        );
        if (repeat) {
            carrito.map((prod) => {
                if (prod.id === product.id) {
                    prod.cantidad++;
                }
            });
        } else {
            carrito.push({
                id: product.id,
                img: product.imagen,
                nombre: product.titulo,
                precio: product.precio,
                cantidad: product.cantidad,
            });
            console.table(carrito);
            saveLocal();
        }
    });
});
const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};
const pintarCarrito = () => {
    modalContent.innerHTML = "";
    modalContent.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
        <h1 class="modal-header-titulo">Carrito</h1>
    `;
    modalContent.append(modalHeader);
    const modalButton = document.createElement("h1");
    modalButton.innerHTML = `✖`;
    modalButton.className = "modal-header-button";

    modalButton.addEventListener("click", () => {
        modalContent.style.display = "none";
    });

    modalHeader.append(modalButton);
    carrito.forEach((product) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-contents";
        carritoContent.innerHTML = `
            <img src="${product.img}">
            <h3>${product.nombre}</h3>
            <p>${product.precio} $</p>
            <span class="restar"> - </span>
            <p>Cantidad: ${product.cantidad}</p>
            <span class="sumar"> + </span>
            <p>Total: ${product.cantidad * product.precio}</p>
            <span class="eliminar-producto">❌</span>
    `;

        modalContent.append(carritoContent);
        let restar = carritoContent.querySelector(".restar");
        restar.addEventListener("click", () => {
            if (product.cantidad !== 1) {
                product.cantidad--;
            }
            saveLocal();
            pintarCarrito();
        });
        let sumar = carritoContent.querySelector(".sumar");
        sumar.addEventListener("click", () => {
            product.cantidad++;
            saveLocal();
            pintarCarrito();
        });

        let eliminar = carritoContent.querySelector(".eliminar-producto");

        eliminar.addEventListener("click", () => {
            elmiinarProducto(product.id);
        });

        eliminar.addEventListener("click", elmiinarProducto);
    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
    const totalCompra = document.createElement("div");
    totalCompra.className = "total-content";
    totalCompra.innerHTML = `Total: ${total * 1.21} $`;

    modalContent.append(totalCompra);
};

verCarrito.addEventListener("click", pintarCarrito);

const elmiinarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });
    pintarCarrito();
    saveLocal();
};