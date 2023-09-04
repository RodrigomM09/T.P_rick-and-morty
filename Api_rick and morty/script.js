
//*verificar mi almacenamiento local: si tengo personajes o si está vacio
let listaPersonajes = JSON.parse (localStorage.getItem("personajes")) || []

//*Crear una funcion que busque en nuestra API el personaje
const buscarPersonaje = async (id) =>{
    const dataPersonaje = await fetch(`https://rickandmortyapi.com/api/character/${id}/`)
    const personajeBuscado = await dataPersonaje.json()
    listaPersonajes.push(personajeBuscado)
    localStorage.setItem("personajes",JSON.stringify(listaPersonajes))
    return personajeBuscado
}

//*Armar una funcion que arme una tarjeta con el personaje pedido y sus datos
const armarTarjeta = (personaje) =>{
    return `<div class="card">
                    <img src="${personaje.image}" class="card-img-top" alt="">
                <div class="card-body">
                <h5 class="card-title">${personaje.name}</h5>
                <p class="card-text"><strong>ID:</strong> ${personaje.id}</p>
                <p class="card-text"><strong>Especie:</strong> ${personaje.species}</p>
                <p class="card-text"><strong>Status:</strong> ${personaje.status}</p>
                <button onclick="eliminar_un_pj(${personaje.id})" type="button" class="btn-close" ></button>
                </div>
            </div>`
}

const agregarDatosTarjeta = async () =>{
    const input = document.querySelector("input#input-personaje")
    const conteTarjeta = document.querySelector(".card")
    
    id_maximos = 826
    const maximosPersonajes = parseInt(input.value)
    const pjExistente = listaPersonajes.some(personaje => personaje.id === maximosPersonajes)

    if (maximosPersonajes <= id_maximos && !pjExistente){
        const personajeEncontrado = await buscarPersonaje(input.value)
        const tarjetalista = armarTarjeta(personajeEncontrado)
        conteTarjeta.innerHTML += tarjetalista 
    } else if (maximosPersonajes > id_maximos){
        alert ("slecciona un numero menor o igual a 826")
    } else {
        alert("personaje existente")
    }
}


const cargarPagina = () =>{
    const conteTarjeta = document.querySelector(".card")
    conteTarjeta.innerHTML = ""
    listaPersonajes.forEach(personajee =>{
        const tarjetaArmada = armarTarjeta(personajee)
        conteTarjeta.innerHTML += tarjetaArmada
    })
}

cargarPagina()


//*Funcion para eliminar todos los personajes
const borrarTodos_pj = () =>{
    localStorage.removeItem("personajes")
    const conteTarjeta = document.querySelector(".card")
    conteTarjeta.innerHTML = ""
    listaPersonajes = []
}

//*Funcion para eliminar un personaje
const eliminar_un_pj = (id) =>{
    listaPersonajes = listaPersonajes.filter(personaje => personaje.id !== id)
    localStorage.setItem("personajes",JSON.stringify(listaPersonajes))
    cargarPagina()
}
