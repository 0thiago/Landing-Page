const validateHelpAlgoForm = {
  
  init: function () {
    this.cacheSelectors()
    this.bindEvents()
  },

  cacheSelectors: function () {
    this.$sendButton = document.querySelector('#sendButton')
    this.$form = document.querySelector('#form')
    this.$inputName = document.querySelector('#inputName')
    this.$inputEmail = document.querySelector('#inputEmail')
    this.$inputCPF = document.querySelector('#inputCPF')
    this.$invalidField = document.querySelector('.invalid-field')
  },

  bindEvents: function () {
    const self = this

    this.$sendButton.onclick = self.Events.submit

    this.$form.onsubmit = self.Events.validateData.bind(this)

    this.$inputCPF.onkeydown = self.Events.CPFonlyNumber.bind(this)
  },

  Events: {
    CPFonlyNumber: function (event) {
      if (isNaN(event.key) === true && event.key !== 'Backspace' && event.key !== "Tab") {
        console.log(event.key)
        return false
      }
    },

    validateData: function (event) {
      const self = validateHelpAlgoForm

      event.preventDefault()

      this.$hasError = false

      let regexName = /^[a-zA-Z ]{2,30}$/

      let regexEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/

      let regexCPF = /^(\d{3})\.?(\d{3})\.?(\d{3})\-?(\d{2}$)$|^(\d{2})\.?(\d{3})\.?(\d{3})\/?([0-1]{4})\-?(\d{2})$/

      if (regexName.test(self.$inputName.value) == false) {
        self.$hasError = true
        self.$inputName.previousElementSibling.innerHTML = ' Informações Incorretas!'
        self.$inputName.classList.add('invalid-input')

      } else {
        self.$inputName.previousElementSibling.innerHTML = ''
        self.$inputName.classList.remove('invalid-input')
      }

      if (regexEmail.test(self.$inputEmail.value) == false) {
        self.$hasError = true
        self.$inputEmail.previousElementSibling.innerHTML = ' Informações Incorretas!'
        self.$inputEmail.classList.add('invalid-input')
      } else {
        self.$inputEmail.previousElementSibling.innerHTML = ''
        self.$inputEmail.classList.remove('invalid-input')
      }

      if (regexCPF.test(self.$inputCPF.value) == false) {
        self.$hasError = true
        self.$inputCPF.previousElementSibling.innerHTML = ' Informações Incorretas!'
        self.$inputCPF.classList.add('invalid-input')
      } else {
        self.$inputCPF.previousElementSibling.innerHTML = ''
        self.$inputCPF.classList.remove('invalid-input')
      }

      if (!self.$hasError) {
        self.$form.submit()
      }
    }
  }
}

validateHelpAlgoForm.init()

const productsSection = {

  init: function () {
    this.cacheSelectors()
    this.bindEvents()
    this.getProducts()
  },

  displayLoading: function () { 
    this.$loadingBar.style.display = "flex";
  },

  hideLoading: function () {
    this.$loadingBar.style.display = "none";
  },

  productHTMLStructure: function (product) {
    return `
      <div id="productContent" class="products__item">
          <div class="products__item-img"><img id="productImg" class="" src="${product.image}" alt="${product.name} Picture" >
          </div>
          <div class="products__item-desc">
            <p id="productName" class="products__item-desc-name">${product.name}</p>
            <p id="productInfo" class="products__item-desc-info">${product.description}</p>
            <p id="productOldPrice" class="products__item-desc-old-price">de: R$ ${product.oldPrice}</p>
            <p id="productNewPrice"  class="products__item-desc-new-price">Por: R$ ${product.price}</p>
            <p id="productInstalments" class="products__item-desc-instalments">ou ${product.installments.count}x de R$ ${product.installments.value}</p>
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
    this.hideLoading()
  },

  showError: function () {
    console.log('showError - ERRO!')
  },

  getProducts: function () {
    this.displayLoading()

    fetch(`https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=${this.$pageNum}`, { method: 'GET' })
      .then(this.convertFromJSON)
      .then(this.fillProducts.bind(this))
      .catch(this.showError.bind(this))
  },

  cacheSelectors: function () {
    this.$loadingBar = document.querySelector('#loadingBar')
    this.$productContainer = document.querySelector('#productsContainer')
    this.$productContent = document.querySelector('#productContent')
    this.$productImg = document.querySelector('#productImg')
    this.$productName = document.querySelector('#productName')
    this.$productInfo = document.querySelector('#productInfo')
    this.$productOldPrice = document.querySelector('#productOldPrice')
    this.$productNewPrice = document.querySelector('#productNewPrice')
    this.$productInstallments = document.querySelector('#productInstallments')
    this.$moreProductsButton = document.querySelector('#moreProductsButton')
    this.$pageNum = 1
  },

  bindEvents: function () {
    const self = productsSection

    this.$moreProductsButton.onclick = self.Events.showMoreProductsButtonClick.bind(this)
  },

  Events: {
    showMoreProductsButtonClick: function () {
      this.$pageNum++
      this.getProducts()
    }
  }
}

productsSection.init()
const shareForm = {

  init: function () {
    this.cacheSelectors()
    this.bindEvents()
  },

  cacheSelectors: function () {
    this.$form = document.querySelector('#shareForm')
    this.$inputName = document.querySelector('#inputFriendsName')
    this.$inputEmail = document.querySelector('#inputFriendsEmail')
    this.$sendButton = document.querySelector('#shareFormSendButton')

  },

  bindEvents: function () {
    const self = this

    this.$sendButton.onclick = self.Events.submit

    this.$form.onsubmit = self.Events.validateData.bind(this)
  },

  Events: {
    validateData: function (event) {
      const self = shareForm

      event.preventDefault()

      self.$hasError = false

      let regexName = /^[a-zA-Z ]{2,30}$/

      let regexEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/

      if (regexName.test(self.$inputName.value) == false) {
        self.$hasError = true
        self.$inputName.previousElementSibling.innerHTML = ' Informações Incorretas!'
        self.$inputName.classList.add('invalid-input')
      } else {
        self.$inputName.previousElementSibling.innerHTML = ''
        self.$inputName.classList.remove('invalid-input')
      }

      if (regexEmail.test(self.$inputEmail.value) == false) {
        self.$hasError = true
        self.$inputEmail.previousElementSibling.innerHTML = ' Informações Incorretas!'
        self.$inputEmail.classList.add('invalid-input')
      } else {
        self.$inputEmail.previousElementSibling.innerHTML = ''
        self.$inputEmail.classList.remove('invalid-input')
      }

      if (!self.$hasError) {
        self.$form.submit()
      }
    }
  }
}
shareForm.init()
