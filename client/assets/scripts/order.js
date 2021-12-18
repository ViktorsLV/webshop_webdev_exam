const baseUrl = "http://localhost:5000/api";
const localStorage = window.localStorage;
const currentUser = localStorage.getItem("token");

const orderRef = document.querySelector("#orderRef");
const orderShipping = document.querySelector("#orderShipping");
const orderPayment = document.querySelector("#orderPayment");
const orderItems = document.querySelector("#orderItems");

const orderId = location.href.split("?")[1];

async function getOrder() {
  try {
    const response = await fetch(`${baseUrl}/orders/${orderId}`, {
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
      const order = await response.json();
      console.log(order)

      orderShipping.innerHTML += `
        <h4>Shipping Details:</h4>
        <p>Email: ${order.user.email}</p>
        <p>Address: ${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.country}</p>
      `
      orderPayment.innerHTML += `
        <h4>Payment Details:</h4>
        <p>Total Price:$ ${order.totalPrice}</p>
        <p>Payment Method: ${order.paymentMethod}</p>
      `
      order.orderItems.forEach(r => {
        orderItems.innerHTML += `
          <h4>Order Items:</h4>
          <div class="flex-row order-items">
            <div class="order-img">
              <img src="../${r.image}" alt="${r.name}">
            </div>
            <div class="order-title">
                <h5 >${r.name}</h5>
            </div>
            <div class="order-price">
                <p >x${r.qty} x $${r.price} = $${r.price * r.qty}</p>
            </div>
          </div>
          
        `;
    });
    }
  } catch (error) {
    // handle server down error
    alert(error);
  }
}


getOrder();
