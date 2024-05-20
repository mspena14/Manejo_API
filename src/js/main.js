import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'

const tbody = document.querySelector('tbody')
const form = document.querySelector("form")
const name = document.querySelector("#name")
const image = document.querySelector("#url-image")
let id

index()

form.addEventListener('submit', async (event) => {
    //ACA DEBEMOS LLAMAR A LA FUNCION QUE SE ENCARGA DE GUARDAR
    event.preventDefault()
    if (id === undefined) {
        console.log(id)
        const newCategory = {
            name: name.value,
            image: image.value
        }
        console.log(newCategory + "Create")
        await create(newCategory)

    } else {
        console.log(id)
        const updateCategory = {
            name: name.value,
            image: image.value
        }
        console.log(updateCategory + "update")
        await update(id, updateCategory) // Enviamos los parametros a la funcion que se encarga de actualizar
    }
    id = undefined
    await index()
})

tbody.addEventListener('click', async function (event) {
    // ACA DEBEMOS LOCALIZAR A LOS ESCUCHADORES DE EVENTOS
    if (event.target.classList.contains("btn-danger")) {
        id = event.target.getAttribute("data-id")
        await deleteItem(id) //Pasamos el id a la funcion que se encarga de eliminar
        await index()
    }

    if (event.target.classList.contains("btn-warning")) {
        id = event.target.getAttribute("data-id")
        const categoryFound = await find(id) //Pasamos el id a la funcion que se encarga de buscar la categoria
        name.value = categoryFound.name
        image.value = categoryFound.image
    }
})

async function index() {
    const response = await fetch('https://api.escuelajs.co/api/v1/categories')
    const data = await response.json()

    tbody.innerHTML = ""
    data.forEach(element => {
        tbody.innerHTML += `
            <td>${element.id}</td>
            <td>${element.name}</td>
            <td>
                <img width="100px" src=${element.image} alt=${element.name}>
            </td>
            <td>${element.creationAt}</td>
            <td>${element.updatedAt}</td>
            <td>
                <button type="button" data-id=${element.id} class="btn btn-warning">Edit</button>
                <button type="button" data-id=${element.id} class="btn btn-danger">Delete</button>
            </td>
        `
    })
}

async function find(id) {
    //ACA DEBEMOS PROGRAMAR LA PETICION PARA BUSCAR UNA CATEGORIA
    const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}`)
    const data = await response.json()
    return data
}

async function create(newCategory) {
    //ACA DEBEMOS PROGRAMAR LA PETICION PARA CREAR UNA CATEGORIA
    await fetch(`https://api.escuelajs.co/api/v1/categories`, {
        method: 'POST',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(newCategory)
    })
}

async function update(id, updatedCategory) {
    //ACA DEBEMOS PROGRAMAR LA PETICION PARA ACTUALIZAR UNA CATEGORIA
    await fetch(`https://api.escuelajs.co/api/v1/categories/${id}`, {
        method: 'PUT',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(updatedCategory)
    })
}

async function deleteItem(id) {
    //ACA DEBEMOS PROGRAMAR LA PETICION PARA ELIMINAR UNA CATEGORIA
    await fetch(`https://api.escuelajs.co/api/v1/categories/${id}`, {
        method: 'DELETE'
    })
}


