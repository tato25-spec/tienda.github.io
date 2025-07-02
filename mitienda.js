//A. definimos nuestro array
const productos =[
    {id: 1, nombre: 'remera', precio: 3000, categoria: "ropa", imagen: "remera.jpg"},
    {id: 2, nombre:'gorra', precio: 1500, categoria:"accesorios", imagen: "gorra.jpg"},
    {id: 3, nombre:'mochila', precio: 2000, categoria: "accesorios", imagen: "mochila.jpg"},
    {id: 4, nombre:'buzo', precio: 6000, categoria:"ropa", imagen: "buzo.jpg"},
    {id: 5, nombre:'zapatillas', precio: 8000, categoria: "ropa", imagen: "zapatilla.jpg"},
    {id: 6, nombre:'campera', precio: 7500, categoria: "ropa",  imagen: "campera.jpg"},  
];
// B. obtenemos el contenedor donde pondremos los divs
const container = document.getElementById('articulo');

// C. recorrer array con "forEach" x cada elemento del array
productos.forEach(productos => {
   
    //Crea un nuevo div para cada elemento
    const div = document.createElement("div");
    
    // agrega la clase para el estilo del "div"
    div.className = 'card p-4 col-md-4 my-2';
    
    //agrega contenido dentro del html con un titulo y el nomnbre del producto
     div.innerHTML = 
     `<div class="card h-100">
    <img src="${productos.imagen}" style="width:50%; margin:0 auto;">
    <div class="card-body d-flex flex-column text-center">
        <h5 class="card-title">${productos.nombre}</h5>
        <p class="card-text">$${productos.precio}</p>
        <button class="btn btn-primary mt-auto" onclick="agregarAlCarrito(${productos.id})">
            <i class="bi bi-gift-fill"></i>
                Agregar al Carrito
        </button>
    </div>
 </div>`;
   
    //este fragmento de codigo agrega el div al contenedor principal//
     container.appendChild(div);
});

     // variable para almacenaar el contador del carrito
     let contadorCarrito = 0;

     //array para almacenar los productos del carrito
     let carrito =[]

     //funcion para agregar productos al carrito
     function agregarAlCarrito(idProducto){
        //buscar el producto en el array de productos
        const producto = productos.find(p => p.id === idProducto);
        if(producto) {
            //incrementar el contador
            contadorCarrito++;
            //actualizar el contador en el boton del carrito
            document.getElementById ('contador').textContent = contadorCarrito;
            //agregar el producto al carrito (o incrementar cantidad si ya existe)
            const productoEnCarrito = carrito.find(p => p.id === idProducto);
            if (productoEnCarrito) {
                productoEnCarrito.cantidad++;
            } else {
                carrito.push({...producto, cantidad: 1});
            }
            //opcional: mostrar notificacion 
            alert(`¡${producto.nombre} agregado al carrito!`);  
         }

        }
        
        
        document.getElementById('verCarrito').addEventListener('click', function()
        {
            const carritoDiv = document.getElementById('carrito');
           
            carritoDiv.classList.toggle('d-none');
            actualizarCarrito();
        })
         
        const listaCarrito = document.getElementById("lista-carrito");

        const totalSpan =  document.getElementById("total");

        const contador = document.getElementById("contador");

        function actualizarCarrito()
        {
            listaCarrito.innerHTML = "";
            let total = 0;
            carrito.forEach(productos =>

                {
                    const item = document.createElement("li");

                    item.className  = "list-group-item d-flex justify-content-between lead";

                    item.textContent = `${productos.nombre} x ${productos.cantidad}`;
                    const precio = document.createElement("span");

                     precio.textContent = `$${productos.precio * productos.cantidad}`;
                     item.appendChild(precio);
                     listaCarrito.appendChild(item);

                     total += productos.precio * productos.cantidad;
                    }
                     );
                     totalSpan.textContent = total;

                     contador.textContent = carrito.reduce ((sum, productos) => sum + productos.cantidad, 0);
                }

                function finalizarCompra()
                {
                    if (carrito.length === 0)
                    {
                        alert("El carrito esta vacio");
                        return;
                    }
                    const total = carrito.reduce((sum, productos) => sum + (productos.precio * productos.cantidad), 0);

                    let mensaje = "¡Hola! Quiero realizar la siguiente compra:%0A%0A";
                    carrito.forEach(productos =>
                    {
                        mensaje += `- ${productos.nombre} x ${productos.cantidad}: $${productos.precio * productos.cantidad}%0A` ;
                    });
                     mensaje += `%0ATotal: $${total}%0A%0A Y proceder con el pago y coordinar envio`;

                     const telefono = "5491160259793";

                     const urlWhatsApp = `https://wa.me/${telefono}?text=${mensaje}`;

                     window.open(urlWhatsApp, '_blank');

                     carrito = [];
                     actualizarCarrito();
                     document.getElementById('carrito').classList.add('d-none');
                 }