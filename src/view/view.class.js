const Product = require('../model/product.class')
const divMessagesUI = document.getElementById('messages');

class View{
    renderNewProduct(product) {
        const div = document.getElementById('almacen').getElementsByTagName('tbody')[0]
        const tr = document.createElement('tr')
        tr.id = 'prod-' + product.id
        tr.innerHTML = `<td>${product.id}</td>
                       <td>${product.name}</td>
                       <td>${product.units}</td>
                       <td>${product.price}</td>
                       <td>${product.productImport()}</td>
                       <td>
                            <button class="btn btn-secondary up" >
                            <span class="material-icons">arrow_drop_up</span>
                            </button>
                            <button class="btn btn-secondary down " >
                            <span class="material-icons">arrow_drop_down</span>
                            </button>
                            <button class="btn btn-secondary edit">
                            <span class="material-icons">edit</span>
                            </button>
                            <button class="btn btn-secondary delete" >
                            <span class="material-icons">delete</span>
                            </button>
                       </td>`
                    
        div.appendChild(tr)
    }

    renderEditProduct(product) {
        const tr = document.getElementById('prod-'+product.id)
        if(product.units > 0){
            tr.querySelector('.down').removeAttribute('disabled')
        }else{
            tr.querySelector('.down').setAttribute('disabled','disabled')
        }
                let tdId = tr.children[0]
                tdId.textContent=product.id
                let tdName = tr.children[1]
                tdName.textContent=product.name
                let tdUnits = tr.children[2]
                tdUnits.textContent=product.units
                let tdPrice = tr.children[3]
                tdPrice.textContent=product.price
                let tdImport = tr.children[4]
                tdImport.textContent=product.productImport()
        
        
    }

    renderDelProduct(id) {
        const numNodos = document.getElementById('almacen').getElementsByTagName('tbody')[0].childElementCount
        const div = document.getElementById('almacen').getElementsByTagName('tbody')[0]
        for (let index = 0; index < numNodos; index++) {
            let trAntiguo = div.children[index]
            if(trAntiguo.firstElementChild.textContent == id){   
            div.removeChild(trAntiguo)
            
            }
        }
    

    }

    renderStoreImport(total) {
        const tfoot = document.getElementById('total')
        tfoot.textContent = total + ' €'
    }

    renderErrorMessage(message) {
        const newMessageDiv = document.createElement('div')
        newMessageDiv.className = "col-sm-12 alert alert-danger alert-dismissible fade show"
        newMessageDiv.innerHTML = `
            <span><strong>ATENCIÓN: </strong>${message}</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" onclick="this.parentElement.remove()"></button>`
        
        divMessagesUI.appendChild(newMessageDiv)
    }
}

module.exports = View;
