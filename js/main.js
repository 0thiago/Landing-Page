
//validating help-algorithm section form

const ValidateHelpAlgoForm = {

  init: function(){

    this.cacheSelectors()
    this.bindEvents()

  },

  cacheSelectors: function(){

    this.$sendButton = document.querySelector('#helpAlgoFormSendButton')
    this.$form = document.querySelector('#helpAlgoForm')
    this.$inputName = document.querySelector('#helpAlgoForm_inputName')

  },

  bindEvents: function(){

    const self = this

    this.$sendButton.onclick = self.Events.submit

    this.$form.onsubmit = self.Events.validateData

  },

  Events: {

    submit: function(event){
      // event.preventDefault()
    },

    validateData: function(){

      
      
      console.log('valid')


    }

  }
}

ValidateHelpAlgoForm.init()

// getting data from api, building the product section structure and behavior
const ProductsSection = {

  init: function () {

    this.cacheSelectors()
    this.bindEvents()
    this.getProducts()

  },

  productHTMLStructure: function(product) {
    return `
      <div id="productContent" class="products__item">
          <img id="productImg" class="products__item-img" src="${product.image}" alt="${product.name} Picture" >
          <div class="products__item-desc">
            <p id="productName" class="products__item-desc-name">${product.name}</p>
            <p id="productOldPrice" class="products__item-desc-old-price">de: R$${product.oldPrice},99</p>
            <p id="productNewPrice"  class="products__item-desc-new-price">Por: R$${product.price},99</p>
            <p id="productInstalments" class="products__item-desc-instalments">ou ${product.installments.count}x de R$${product.installments.value.toString().replace(".",",")}9</p>
            <button class="products__item-desc-buy-button button">Comprar</button>
          </div>
        </div>
      `

  },

  convertFromJSON: function (response) {
    return response.json()
  },

  fillProducts: function (response) {

    response.products.forEach((product) => {

      this.$productContainer.innerHTML += this.productHTMLStructure(product);

    })

  },

  showError: function () {
    console.log('showError - ERRO!')
  },

  getProducts: function () {

    fetch(`https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=${this.$pageNum}`, { method: 'GET' })
      .then(this.convertFromJSON)
      .then(this.fillProducts.bind(this)) 
      .catch(this.showError.bind(this))

  },

  cacheSelectors: function () {

    this.$productContainer = document.querySelector('#productsContainer')
    this.$productContent = document.querySelector('#productContent')
    this.$productImg = document.querySelector('#productImg')
    this.$productName = document.querySelector('#productName')
    this.$productOldPrice = document.querySelector('#productOldPrice')
    this.$productNewPrice = document.querySelector('#productNewPrice')
    this.$productInstallments = document.querySelector('#productInstallments')
    this.$moreProductsButton = document.querySelector('#moreProductsButton')
    this.$pageNum = 1
    

  },

  bindEvents: function () {

    const self = ProductsSection

    this.$moreProductsButton.onclick = self.Events.showMoreProducts_button_click.bind(this)
      
   
  },

  Events: {

    showMoreProducts_button_click: function(){
      
      this.$pageNum++
      this.getProducts()

    }
  }
}

ProductsSection.init()

