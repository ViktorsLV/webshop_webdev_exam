const baseUrl = "http://localhost:5000/api";
const localStorage = window.localStorage; /* TODO: use?  */

/* REGISTERING USER */
const productImg = document.querySelector("#productImg");
const productName = document.querySelector("#productName");
const productPrice = document.querySelector("#productPrice");
const productBox = document.querySelector("#productBox");
const submit = document.getElementById("submit");

const productId = location.href.split("?")[1]; // getting the productId which was passed on to URL string

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
      productBox.innerHTML += `
        <div class="product-image">
          <img src="../${product.image}" alt="${product.name}">
        </div>

        <div class="product-details flex-col">
            <h3 class="no-spacing">${product.name}</h3>
            <h4 class="no-spacing">$ ${product.price}</h4>
            <div class="mt-2">
              ${product.description}
            </div>
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
      product.countInStock > 0 ? div.innerHTML = `<button class="submit-btn submit">ADD TO CART</button>` : div.innerHTML = `<button class="submit-btn d-none">ADD TO CART</button>`
    }
  } catch (error) {
    alert(error);
  }
}

fetchProducts();

/* ADDING PRODUCTS TO CART */
