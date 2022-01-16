const baseUrl = "http://localhost:5000/api";
const localStorage = window.localStorage; 
const currentUser = localStorage.getItem("token");
const permissions = localStorage.getItem("permissions");

/* UTILS */
const loader = document.querySelector("#loader");
const admin = document.querySelector("#admin");
const span = document.getElementsByClassName("close")[0];
const alertError = document.querySelector("#alertError");
const alertSuccess = document.querySelector("#alertSuccess");
const alertErrorSmall = document.querySelector("#alertErrorSmall");
const alertSuccessSmall = document.querySelector("#alertSuccessSmall");

/* READING PRODUCT */
const productImg = document.querySelector("#productImg");
const productName = document.querySelector("#productName");
const productPrice = document.querySelector("#productPrice");
const productBox = document.querySelector("#productBox");

/* MODALS */
const deleteProductBtn = document.querySelector("#deleteProductBtn")
const confirmDelete = document.querySelector("#confirmDelete");
const deleteModal = document.querySelector("#deleteModal");

const editProductModal = document.querySelector("#editProductModal");
const editProductBtn = document.querySelector("#editProductBtn");

/* TEXT AND INPUTS */
const pName = document.querySelector('#name');
const brand = document.querySelector('#brand');
const price = document.querySelector('#price');
const category = document.querySelector('#category');
const stock = document.querySelector('#stock');
const image = document.querySelector('#image');
const description = document.querySelector('#description');

const submitButton = document.querySelector('#submitButton');

const productId = location.href.split("?")[1]; // getting the productId which was passed on to URL string

// custom function to show alert
const showAlert = (msg, el) => {
  el.style.display = "block"; // change alert visibility on HTML page
  el.innerHTML = `${msg}`; // add text for alert
  setTimeout(function () {
    el.parentNode.removeChild(el); // remove alert from form after 5 seconds
  }, 10000);
};

const passAlert = (msg) => {
  localStorage.setItem('status', msg)
};

const reqHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  Authorization: `Bearer ${currentUser}`,
}

async function fetchProduct() {
  try {
    const response = await fetch(`${baseUrl}/products/${productId}`, {
      method: "GET",
      headers: reqHeaders,
    });
    if (response.status >= 400) {
      const text = "Something went wrong";
      console.log(response, text);
      // showAlert(text, alertError);
    }
    if (response.status >= 200) {
      const product = await response.json();
      console.log(product);
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

async function deleteProduct(productId) {
  try {
    const response = await fetch(`${baseUrl}/products/${productId}`, {
      method: "DELETE",
      headers: reqHeaders 
    });
    if (response.status >= 400) {
      const text = "Something went wrong";
      showAlert(text, alertError);
    }
    if (response.status === 200) {
      const result = await response.json();
      console.log(result);

      // sending alert to Local Storage and retrieving it on parent page
      const text = "success";
      passAlert(text)

      closeDeleteModal()
      location.replace('http://127.0.0.1:5500/client/assets/pages/admin/products.html'); 
    }
  } catch (error) {
    // handle server down error
    alert(error);
  }
}

async function editProduct(data) {
  try {
    const response = await fetch(`${baseUrl}/products/${productId}`, {
      method: "PUT",
      headers: reqHeaders ,
      body: JSON.stringify(data),
    });
    if (response.status >= 400) {
      const text = "Something went wrong";
      showAlert(text, alertError);
      console.log(response.error)
    }
    if (response.status === 201) {
      const result = await response.json();
      console.log(result);

      const text = "Product successfully created!";
      showAlert(text, alertSuccessSmall);
      console.log('XDD')
      editProductModal.style.display = "none";
    }
    location.reload();
  } catch (error) {
    // handle server down error
    console.log(error)
    alert(error);
  }
}

// if (loading) {
//   productDetails.innerHTML += `<h1>Loading data...</h1>`
// }

submitButton.addEventListener('click', (e) => {
  e.preventDefault();

  // check if the fields are not empty
  if(!(pName.value && brand.value && price.value && category.value && stock.value && description.value)) {
    const text = "All fields must be filled!"
    showAlert(text, alertError)
  } else {
    /* destructuring obj */
    const data = { 
      name: pName.value, 
      brand: brand.value, 
      price: price.value, 
      category: category.value, 
      countInStock: stock.value,
      image: '/images/test.png',
      description: description.value
    }
    editProduct(data);
  }
});

function openDeleteModal() {
  deleteModal.style.display = "block";
}

function closeDeleteModal() {
  deleteModal.style.display = "none";
}

confirmDelete.addEventListener("click", () => {
  deleteProduct(productId)
})

span.onclick = function() {
  deleteModal.style.display = "none";
}

// window.onclick = function(event) {
//   if (event.target == deleteModal) {
//     deleteModal.style.display = "none";
//   }
// }

window.onclick = function(event) {
  if (event.target == editProductModal) {
    editProductModal.style.display = "none";
  }
}

function checkPermissions() {
  if (!permissions) {
    const text = "Permissions denied! Unauthorized!";
    alert(text)
    location.replace('http://127.0.0.1:5500/client/assets/pages/admin.html'); 
    return;
  }
}

checkPermissions();
fetchProduct();