const baseUrl = "http://localhost:5000/api";
const localStorage = window.localStorage;
const currentUser = localStorage.getItem("token");
const permissions = localStorage.getItem("permissions");
const path = localStorage.getItem("path");

const productCell = document.querySelector("#productCell");
const productDetails = document.querySelector("#productDetails");

/* MODALS */
const confirmDelete = document.querySelector("#confirmDelete");
const deleteProductModal = document.querySelector("#deleteProductModal");

const addProductModal = document.querySelector("#addProductModal");
const addProductBtn = document.querySelector("#addProductBtn");

/* TEXT AND INPUTS */
const productName = document.querySelector("#name");
const brand = document.querySelector("#brand");
const price = document.querySelector("#price");
const category = document.querySelector("#category");
const stock = document.querySelector("#stock");
const image = document.querySelector("#image");
const description = document.querySelector("#description");

const submitButton = document.querySelector("#submitButton");

/* UTILS */
const loader = document.querySelector("#loader");
const admin = document.querySelector("#admin");
const span = document.getElementsByClassName("close")[0];
const alertError = document.querySelector("#alertError");
const alertSuccess = document.querySelector("#alertSuccess");
const alertErrorSmall = document.querySelector("#alertErrorSmall");
const alertSuccessSmall = document.querySelector("#alertSuccessSmall");

let productId = null;
let formData;

// custom function to show alert
function showAlert(msg, el) {
  el.style.display = "block"; // change alert visibility on HTML page
  el.innerHTML = `${msg}`; // add text for alert
  setTimeout(function () {
    el.parentNode.removeChild(el); // remove alert from form after 5 seconds
  }, 5000);
}

function getAlert() {
  if (localStorage.getItem("status") === 'success') {
    alertSuccessSmall.style.display = "block"; // change alert visibility on HTML page
    alertSuccessSmall.innerHTML = `Success!`;
    setTimeout(function () {
      alertSuccessSmall.parentNode.removeChild(alertSuccessSmall); // remove alert from form after 5 seconds
    }, 3000);
  }
  else if (localStorage.getItem("status") === 'error') {
    alertErrorSmall.style.display = "block"; // change alert visibility on HTML page
    alertErrorSmall.innerHTML = `Error, try again later!`;
    setTimeout(function () {
      alertErrorSmall.parentNode.removeChild(alertErrorSmall); // remove alert from form after 5 seconds
    }, 3000);
  } else {
    return
  }
  localStorage.removeItem("status");
}

getAlert()

let loading = false;

const reqHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  Authorization: `Bearer ${currentUser}`,
};

async function createProduct(data) {
  try {
    const response = await fetch(`${baseUrl}/products`, {
      method: "POST",
      headers: reqHeaders,
      body: JSON.stringify(data),
    });
    if (response.status >= 400) {
      const text = "Something went wrong";
      showAlert(text, alertError);
      console.log(response.error);
    }
    if (response.status === 201) {
      const result = await response.json();
      console.log(result);

      const text = "Product successfully created!";
      showAlert(text, alertSuccessSmall);
      
      addProductModal.style.display = "none";
      localStorage.removeItem("path")
    }
    location.reload();
  } catch (error) {
    // handle server down error
    console.log(error);
    alert(error);
  }
}

async function uploadFile(data) {
  try {
      const response = await fetch(`${baseUrl}/upload`, {
        method: "POST",
        body: data
      })
      console.log(response.status)
      if (response.status === 200) {
        const result = await response.json();
        console.log(result)
        localStorage.setItem("path", result)
      }
    } catch (error) {
      console.log(error.message)
    }
}

async function getAllProducts() {
  loader.style.display = "block";
  try {
    const response = await fetch(`${baseUrl}/products`, {
      method: "GET",
      headers: reqHeaders,
    });
    if (response.status >= 400) {
      const text = "Something went wrong. Please, try again...";
      showAlert(text, alertError);
    }
    if (response.status === 200) {
      // 201 - created
      const result = await response.json();
      console.log(result);
      if (result.length > 0) {
        result.reverse().forEach((product, index) => {
          productDetails.innerHTML += `
            <tr>
              <td>${index + 1}</td>
              <td>${product._id}</td>
              <td class="mobile-hide">${product.name.substring(0, 10)}</td>
              <td class="mobile-hide">$ ${product.price}</td>
              <td class="button-detail">
                <button onclick="openDeleteModal('${
                  product._id
                }')" class="trash details"><i class="fas fa-trash-alt"></i></button>
                <a href="../../pages/admin/product.html?${product._id}">
                  <button class="link details"><i class="fas fa-external-link-square-alt"></i></button>
                </a>
              </td>
            </tr>  
          `;
        });
      } else {
        productDetails.style.display = "none";
        productCell.innerHTML += `
            <h4>You have no registered products :(</h4>
            <a href="../pages/shop.html"><button class="btn submit-btn details">GO TO SHOP</button></a>
        `;
      }
    }
  } catch (error) {
    alert(error);
    // handle server down error
  }
  loader.style.display = "none";
}

async function deleteProduct(productId) {
  try {
    const response = await fetch(`${baseUrl}/products/${productId}`, {
      method: "DELETE",
      headers: reqHeaders,
    });
    if (response.status >= 400) {
      const text = "Something went wrong";
      showAlert(text, alertError);
    }
    if (response.status === 200) {
      const result = await response.json();
      console.log(result);

      // const text = "Product deleted successfully!";
      // showAlert(text, alertSuccessSmall);

      deleteProductModal.style.display = "none";
      location.reload();
    }
  } catch (error) {
    // handle server down error
    alert(error);
  }
}

image.addEventListener("change", (event) => {
  event.preventDefault();
  const file = event.target.files[0]
  formData = new FormData()
  formData.append('image', file)

  uploadFile(formData)
  console.log(formData)
  console.log(file)
})

if (loading) {
  productDetails.innerHTML += `<h1>Loading data...</h1>`;
}

submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  // check if the fields are not empty
  if (
    !(
      productName.value &&
      brand.value &&
      price.value &&
      category.value &&
      stock.value &&
      description.value
    )
  ) {
    const text = "All fields must be filled!";
    showAlert(text, alertError);
  } else {
    /* destructuring obj */
    const data = {
      name: productName.value,
      brand: brand.value,
      price: price.value,
      category: category.value,
      countInStock: stock.value,
      image: ((path !== null) ? path : "/test.png"),
      description: description.value,
    };
    createProduct(data);
  }
});

confirmDelete.addEventListener("click", () => {
  deleteProduct(productId);
});

span.onclick = function () {
  deleteProductModal.style.display = "none";
};

function openDeleteModal(id) {
  deleteProductModal.style.display = "block";
  productId = id;
  // console.log(productId)
}

addProductBtn.addEventListener("click", () => {
  addProductModal.style.display = "block";
});

// When the user clicks anywhere outside of the deleteProductModal, close it
window.onclick = function (event) {
  if (event.target === deleteProductModal) {
    deleteProductModal.style.display = "none";
  }
};

window.onclick = function (event) {
  if (event.target === addProductModal) {
    addProductModal.style.display = "none";
  }
};

function checkPermissions() {
  if (!permissions) {
    location.replace("http://127.0.0.1:5500/client/assets/pages/admin.html");
    const text = "Permissions denied! Unauthorized!";
    alert(text);
    return;
  }
}

checkPermissions();
getAllProducts();
