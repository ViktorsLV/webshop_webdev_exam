const baseUrl = "http://localhost:5000/api";
const localStorage = window.localStorage;
const currentUser = localStorage.getItem("token");
const permissions = localStorage.getItem("permissions");

const productCell = document.querySelector("#productCell");
const productDetails = document.querySelector("#productDetails");
const loader = document.querySelector("#loader");

const confirmDelete = document.querySelector("#confirmDelete");
const deleteModal = document.querySelector("#deleteModal");
const deleteAccountBtn = document.querySelector("#deleteAccountBtn");
const admin = document.querySelector("#admin");

const span = document.getElementsByClassName("close")[0];

const alertError = document.querySelector("#alertError");
const alertSuccess = document.querySelector("#alertSuccess");

// custom function to show alert
const showAlert = (msg, el) => {
  el.style.display = "block"; // change alert visibility on HTML page
  el.innerHTML = `${msg}`; // add text for alert
  setTimeout(function () {
    el.parentNode.removeChild(el); // remove alert from form after 5 seconds
  }, 5000);
};

let loading = false;

const reqHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  Authorization: `Bearer ${currentUser}`,
}

// async function deleteProduct() {
//   try {
//     const response = await fetch(`${baseUrl}/users/me/delete`, {
//       method: "DELETE",
//       headers: reqHeaders 
//     });
//     if (response.status >= 400) {
//       const text = "User not found";
//       showAlert(text, alertError);
//     }
//     if (response.status === 200) {
    
//       const result = await response.json();
//       console.log(result);
//       localStorage.clear(); // logout user and clear the cart
//       location.replace('http://127.0.0.1:5500/client/index.html');
//     }
//   } catch (error) {
//     // handle server down error
//     alert(error);
//   }
// }

async function getAllProducts() {
  loader.style.display = 'block';
  try {
    checkPermissions()
    const response = await fetch(`${baseUrl}/products`, {
      method: "GET",
      headers: reqHeaders 
    });
    if (response.status >= 400) {
      const text = "Something went wrong. Please, try again...";
      showAlert(text, alertError);
    }
    if (response.status === 200) {
      // 201 - created
      const result = await response.json();
      console.log(result)
      if (result.length > 0) {
        result.forEach((product) => {
          productDetails.innerHTML += `
            <tr>
              <td>${product._id}</td>
              <td class="mobile-hide">${(product.name).substring(0, 10)}</td>
              <td class="mobile-hide">$ ${product.price}</td>
              <td class="button-detail">
                <button class="trash details"><i class="fas fa-trash-alt"></i></button>
                <a href="../../pages/admin/product.html?${product._id}">
                  <button class="link details"><i class="fas fa-external-link-square-alt"></i></button>
                </a>
              </td>
            </tr>  
          `;
        });
      } else { 
        productDetails.style.display = 'none';
        productCell.innerHTML += `
            <h4>You have no registered products :(</h4>
            <a href="../pages/shop.html"><button class="btn submit-btn details">GO TO SHOP</button></a>
        `;
      }
    }
  } catch (error) {
    checkForUser()
    alert(error);
    // handle server down error
  } 
  loader.style.display = 'none';
}

if (loading) {
  productDetails.innerHTML += `<h1>Loading data...</h1>`
}

// confirmDelete.addEventListener("click", () => {
//   // deleteMe()
// })

// span.onclick = function() {
//   deleteModal.style.display = "none";
// }

// When the user clicks anywhere outside of the deleteModal, close it
window.onclick = function(event) {
  if (event.target == deleteModal) {
    deleteModal.style.display = "none";
  }
}

function checkPermissions() {
  if (!permissions) {
    location.replace('http://127.0.0.1:5500/client/assets/pages/admin.html'); 
    const text = "Permissions denied! Unauthorized!";
    alert(text)
  }
}

getAllProducts();