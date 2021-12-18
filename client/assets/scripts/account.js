const baseUrl = "http://localhost:5000/api";
const localStorage = window.localStorage;
const currentUser = localStorage.getItem("token");

const updateBtn = document.querySelector("#updateBtn");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#email");

const orderDetails = document.querySelector("#orderDetails");
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

async function getMe(data) {
  try {
    console.log(data);
    const response = await fetch(`${baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${currentUser}`,
      },
    });
    if (response.status >= 400) {
      const text = "Something went wrong. Please, try again...";
      showAlert(text, alertError);
    }
    if (response.status === 200) {
    
      const result = await response.json();
      console.log(result);
      firstName.value = result.firstName;
      lastName.value = result.lastName;
      email.value = result.email;
    }
  } catch (error) {
    // handle server down error
    alert(error);
  }
}

async function getMyOrders(data) {
  try {
    console.log(data);
    const response = await fetch(`${baseUrl}/orders/myOrders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${currentUser}`,
      },
    });
    if (response.status >= 400) {
      const text = "Something went wrong. Please, try again...";
      orderDetails.innerHTML += `
        <h3>${text}</hr>
      `
    }
    if (response.status === 200) {
      // 201 - created
      const result = await response.json();
      console.log(result)
      result.forEach((order) => {
        orderDetails.innerHTML += `
          <tr>
            <td>${order._id}</td>
            <td>${(order.createdAt).substring(0, 10)}</td>
            <td>${order.isDelivered ? "Yes" : "No" }</td>
            <td class="button-detail"><a href="../pages/order.html?${order._id}"><button class="btn submit-btn details">DETAILS</button></a></td>
          </tr>  
        `;
      });
      // window.location.replace("http://127.0.0.1:5500/client/assets/pages/complete.html");
    }
  } catch (error) {
    // handle server down error
    alert(error);
  }
}

async function editUser(data) {
  try {
    const response = await fetch(`${baseUrl}/users/me/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${currentUser}`,
      },
      body: JSON.stringify(data),
    });
    if (response.status >= 400) {
      const text = "Something went wrong. Please, try again...";
      showAlert(text, alertError);
    }
    if (response.status === 200) {
      const result = await response.json();
      console.log(result);

    }
  } catch (error) {
    // handle server down error
    alert(error);
  }
}

// add handler on login form button click
updateBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // check if the fields are not empty
  if (!(firstName.value && lastName.value && email.value)) {
    const text = "Required fields must be filled!";
    showAlert(text, alertError);
  } else {
    const data = { firstName: firstName.value, lastName: lastName.value, email: email.value};
    editUser(data);
  }
});

getMe();
getMyOrders();