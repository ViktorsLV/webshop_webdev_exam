const baseUrl = "http://localhost:5000/api";
const localStorage = window.localStorage; 
const currentUser = localStorage.getItem("token");
const permissions = localStorage.getItem("permissions");

/* REGISTERING USER */
const productImg = document.querySelector("#productImg");
const productName = document.querySelector("#productName");
const productPrice = document.querySelector("#productPrice");
const productBox = document.querySelector("#productBox");
const alertSuccess = document.querySelector('#alertSuccess');
const alertWarning = document.querySelector('#alertWarning');

const productId = location.href.split("?")[1]; // getting the productId which was passed on to URL string

// custom function to show alert
const showAlert = (msg, el) => {
  el.style.display = "block"; // change alert visibility on HTML page
  el.innerHTML = `${msg}`; // add text for alert
  setTimeout(function () {
    el.parentNode.removeChild(el); // remove alert from form after 5 seconds
  }, 10000);
};

async function fetchProduct() {
  checkPermissions();
  try {
    const response = await fetch(`${baseUrl}/products/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    if (response.status >= 400) {
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
          <img src="../../${product.image}" alt="${product.name}">
        </div>

        <div class="product-details flex-col">
            <h3 class="no-spacing">${product.name}</h3>
            <h4 class="no-spacing secondary">${product.brand}</h4>
            <h5 class="price">$${product.price}</h5>
            <div class="">${product.description}</div>
        </div>
    `;
    }
  } catch (error) {
    alert(error);
  }
}

window.onload = fetchProduct();

function checkPermissions() {
  if (!permissions) {
    const text = "Permissions denied! Unauthorized!";
    alert(text)
    location.replace('http://127.0.0.1:5500/client/assets/pages/admin.html'); 
  }
}