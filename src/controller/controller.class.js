const View = require('../view/view.class')
const Store = require('../model/store.class')
const Product = require('../model/product.class')

class Controller {
    constructor() {
        this.store = new Store(1)
        this.view = new View()
    }

    addProductToStore(formData) {
        // Cambiamos los datos en el modelo
        let product = this.store.addProduct(formData)
        let total = this.store.totalImport()
        if(product){
            this.view.renderNewProduct(product)
            let tr = document.getElementById('prod-'+ formData.id)
        
            tr.querySelector('.delete').addEventListener('click', () => {
                this.deleteProductFromStore(product.id)
            })
    
            tr.querySelector('.up').addEventListener('click', () => {
                let newProd = {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    units: product.units+1
                }
                this.changeProductStock(newProd)
            })
    
            tr.querySelector('.down').addEventListener('click', () => {
                let newProd = {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    units: product.units-1
                }
               this.changeProductStock(newProd)
            })
    
            tr.querySelector('.edit').addEventListener('click', () => {
                 document.getElementById("formulario").classList.remove("hide")
                this.changeProductInStore(product)
            })
            this.view.renderStoreImport(total)
        }else{
            this.view.renderErrorMessage('El producto no se ha podido añadir')
        }
        


        // Si todo ha ido bien mostramos los datos en
        // la página y si no mostramos el error
    }

    deleteProductFromStore(prodId) {
        var producto = this.store.findProduct(Number(prodId))
        console.log(producto)
        if(prodId){
            var conf1 = prompt("Estas Seguro de querer borrar el producto "+prodId+" ? S/N");
            if(conf1 == 'S'){
                if(producto.units > 0){
                    var conf2 = prompt("El producto "+prodId+" tiene " +producto.units+ " unidades quieres borrarlo ? S/N");
                    if(conf2 == 'S'){
                      let newProd = {
                          id:producto.id,
                          units: 0-producto.units
                      }  
                      this.store.changeProductUnits(newProd)
                      this.store.delProduct(prodId)
                      this.view.renderDelProduct(prodId)
                    }
                }else{
                    this.store.delProduct(prodId)
                    this.view.renderDelProduct(prodId)
                }
             
            }
          }

        // No olvides pedir confirmación y, si el producto
        // tiene unidades pedir una segunda confirmación
    }

    changeProductInStore(formData) {
        document.getElementById("newprod-id").value=formData.id
        document.getElementById('newprod-name').value=formData.name
        document.getElementById("newprod-price").value=formData.price
        document.getElementById("newprod-units").value=formData.units
    }

    changeProductStock(formData) {
       let product = this.store.changeProduct(formData)
       let total = this.store.totalImport()
       if(product){
        this.view.renderEditProduct(product)
        this.view.renderStoreImport(total)
       }
    }
}

module.exports = Controller
