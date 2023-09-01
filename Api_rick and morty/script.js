
let listaPersonajes = JSON.parse(localStorage.getItem("personajes")) || []

const buscarPersonaje = async (id) =>{
    const dataPersonaje = await fetch(`https://rickandmortyapi.com/api/character/${id}/`)
    const personajeBuscado = await dataPersonaje.json()
    listaPersonajes.push(personajeBuscado)
    localStorage.setItem("personajes",JSON.stringify(listaPersonajes))
    return personajeBuscado
}

const armarCard = (personaje) =>{
    return `
            <div class="tarjeta">    
                    <img src="${personaje.image}" alt="${personaje.name}">
                    <div class="card-body">
                        <h5 class="card-title">${personaje.name}</h5><br>
                        <p class="card-text"><strong>Status:</strong> ${personaje.status}</p>
                        <p class="card-text"><strong>Specie:</strong> ${personaje.species}</p>
                        <button class="btn-close" onclick="eliminarPersonaje(${personaje.id})"></button>
                    </div>
            </div> `
}

const agregarDatosCard = async () =>{
    const input = document.querySelector("input#input-personaje")
    const conteTarjeta = document.querySelector(".tarjeta")
    const id_maximos = 826
    const seleccion_maxima = parseInt(input.value)
    const personajeExistente = listaPersonajes.some(personaje => personaje.id === seleccion_maxima)

    if (seleccion_maxima <= id_maximos && !personajeExistente) {
        const personajeEncontrado = await buscarPersonaje(input.value)
        const cardlista = armarCard(personajeEncontrado)
        conteTarjeta.innerHTML += cardlista
    } else if (seleccion_maxima > id_maximos) {
        alert("Seleccione un numero menor o igual a 826")
        } else {
        alert("Ese personaje ya fue agregado")
    }
}

const cargarPagina = () =>{
    const conteTarjeta = document.querySelector(".tarjeta")
    conteTarjeta.innerHTML = ""
    listaPersonajes.forEach(personaje =>{
        const cartaArmada = armarCard(personaje)
        conteTarjeta.innerHTML += cartaArmada
    })
}

cargarPagina()


document.addEventListener("DOMcontenidoCarga", function () {
    const botonBuscar = document.getElementById("btn-buscar")
    botonBuscar.addEventListener("click", agregarDatosCard)
    const botonBorrarTodos = document.getElementById("btn-borrar-todos");
    botonBorrarTodos.addEventListener("onclick", borrarTodosLosPersonajes);
})
function borrarTodosLosPersonajes() {
    localStorage.removeItem("personajes")
    const conteTarjeta = document.querySelector(".tarjeta")
    conteTarjeta.innerHTML = ""
    
}

function eliminarPersonaje(id) {
    listaPersonajes = listaPersonajes.filter(personaje => personaje.id !== id)
    localStorage.setItem("personajes", JSON.stringify(listaPersonajes))
    cargarPagina()
}

