const baseUrl = "http://localhost:5000/api";
const localStorage = window.localStorage;
const currentUser = localStorage.getItem("token");

const submitBtn = document.querySelector("#submitBtn");
const country = document.querySelector("#country");
const address = document.querySelector("#address");
const city = document.querySelector("#city");
const zip = document.querySelector("#zip");
const alertError = document.querySelector("#alertError");

// custom function to show alert
const showAlert = (msg, el) => {
  el.style.display = "block"; // change alert visibility on HTML page
  el.innerHTML = `${msg}`; // add text for alert
  setTimeout(function () {
    el.parentNode.removeChild(el); // remove alert from form after 5 seconds
  }, 5000);
};

async function completeOrder(data) {
  try {
    // console.log(data)
    const response = await fetch(`${baseUrl}/orders`, {
      method: "POST",
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
    if (response.status === 201) { // 201 - created
      const result = await response.json();
      console.log(result);
      location.href = "http://127.0.0.1:5500/client/assets/pages/complete.html";
    }
  } catch (error) {
    // handle server down error
    alert(error);
  }
}

// add handler on login form button click
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // check if the fields are not empty
  if (!(country.value && address.value && city.value && zip.value)) {
    const text = "Required fields must be filled!";
    showAlert(text, alertError);
  } else {
    const data = {
      orderItems: [
        {
          name: "XDDDDDDDDDDD",
          qty: "1",
          image: "/images/airpods.jpg",
          price: "89.99",
          product: "61b74aa992f1a3a426e14e42",
        },
      ],
      shippingAddress: {
        address: "Jelgavas 4",
        city: "Jurmala",
        postalCode: "2010",
        country: "Latvia",
      },
      paymentMethod: "visa",
      totalPrice: "89.99",
    };
    completeOrder(data);
  }
});