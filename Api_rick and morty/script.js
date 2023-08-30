
const listaPersonajes = JSON.parse(localStorage.getItem("personajes")) || []

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
                    </div>
            </div> `
}

const agregarDatosCard = async () =>{
    const input = document.querySelector("input#input-personaje")
    const conteTarjeta = document.querySelector(".tarjeta")
    const personajeEncontrado = await buscarPersonaje (input.value)
    const cardlista = armarCard (personajeEncontrado)
    conteTarjeta.innerHTML += cardlista
}

const cargarPagina = () =>{
    const conteTarjeta = documet.querySelector(".tarjeta")
    conteTarjeta.innerHTML = ""
    listaPersonajes.forEach(personaje =>{
        const cartaArmada = armarCard(personaje)
        conteTarjeta.innerHTML += cartaArmada
    })
}


