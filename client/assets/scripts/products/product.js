const baseUrl = "http://localhost:5000/api";
const localStorage = window.localStorage; /* TODO: use?  */

/* REGISTERING USER */
const productImg = document.querySelector("#productImg");
const productName = document.querySelector("#productName");
const productPrice = document.querySelector("#productPrice");
const productBox = document.querySelector("#productBox");
const alertSuccess = document.querySelector('#alertSuccess');
const alertWarning = document.querySelector('#alertWarning');
let cartItems = JSON.parse(localStorage.getItem('cart'));
if (!cartItems) {
	cartItems = [];
}

const productId = location.href.split("?")[1]; // getting the productId which was passed on to URL string

// custom function to show alert
const showAlert = (msg, el) => {
  el.style.display = "block"; // change alert visibility on HTML page
  el.innerHTML = `${msg}`; // add text for alert
  setTimeout(function () {
    el.parentNode.removeChild(el); // remove alert from form after 5 seconds
  }, 10000);
};

async function fetchProducts() {
  try {
    const response = await fetch(`${baseUrl}/products/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    if (response.status >= 400) {
      /* TODO: better error handling*/
      const text = "Something went wrong";
      console.log(response, text);
      // showAlert(text, alertError);
    }
    if (response.status >= 200) {
      const product = await response.json();
      console.log(product);
      // <div class="secondary">${product.category}</div>
      productBox.innerHTML += `
        <div class="product-image">
          <img src="../${product.image}" alt="${product.name}">
        </div>

        <div class="product-details flex-col">
            <h3 class="no-spacing">${product.name}</h3>
            <h4 class="no-spacing secondary">${product.brand}</h4>
            <h5 class="">$ ${product.price}</h5>
            <div class="">${product.description}</div>
        </div>

        <div class="product-checkout flex-col">
            <div class="flex-row between checkout-table">
                <p>Price</p>
                <p>$ ${product.price}</p>
            </div>
            <div class="flex-row between checkout-table">
                <p>Status</p>
                <p>${product.countInStock > 0 ? "In Stock" : "Out of Stock"}</p>
            </div>
            <div id="div">
            
            </div>
        </div>
            `;
            // hide button if there are no stock for item
        const div = document.getElementById('div');
        const btn = document.createElement('button');
        btn.className = 'submit-btn';
        btn.innerHTML = `ADD TO CART`
        div.appendChild(btn);

        product.countInStock > 0 ? btn.style.display = 'block' : btn.style.display = 'none' 

        btn.addEventListener('click', () => {addToCart(product)});
    }
  } catch (error) {
    alert(error);
  }
}

window.load = fetchProducts();

/* ADDING PRODUCTS TO CART */
function addToCart(product) {
	for (let i = 0; i < cartItems.length; i++) {
		if (cartItems[i]._id === product._id) { // check if the item has already been added to cart 
      const text = "Product already in cart!"
      showAlert(text, alertWarning)
			return;
		} 
	}
  const text = "Product added!"
  showAlert(text, alertSuccess)
  
  cartItems.push({...product, qty: 1}); // add 1 item to cart by default
  localStorage.setItem('cart', JSON.stringify(cartItems));
}