'use strict'

const Controller = require('./controller/controller.class')

let  myController = new Controller()

// Aquí importaremos la clase del controlador e instanciaremos uno

// A continuación crearemos una función manejadora para cada formulario
window.addEventListener('load', () => {

  // función manejadora del formulario 'new-prod'
  document.getElementById('new-prod').addEventListener('submit', (event) => {
    event.preventDefault()

    // Aquí el código para obtener los datos del formulario
    const id = document.getElementById('newprod-id').value
    const name = document.getElementById('newprod-name').value
    const price = document.getElementById('newprod-price').value
    const units = parseInt(document.getElementById('newprod-units').value)  

    // Aquí llamamos a la función del controlador que añade productos (addProductToStore)
    // pasándole como parámetro esos datos
    if(id == ""){
      myController.addProductToStore({ name:name, price:price, units:units })  
    }else{
      myController.changeProductStock({id:id, name:name, price:price, units:units})
    }

     
    // Sintaxis de ES2015 que equivale a 
    //
    // myController.addProductToStore(
    //   { 
    //     name: name,
    //     price: price 
    //   }
    // ) 
  })

})
