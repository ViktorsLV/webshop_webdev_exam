const baseUrl = "http://localhost:5000/api";
const localStorage = window.localStorage;
const currentUser = localStorage.getItem("token");

const orderRef = document.querySelector("#orderRef");

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
      const result = await response.json();
      console.log(result)
      orderRef.innerHTML += orderId
        orderDetails.innerHTML += `
          <tr>
            <td>${result._id}</td>
            <td>${(result.createdAt).substring(0, 10)}</td>
            <td>${result.isDelivered ? "Yes" : "No" }</td>
            <td class="button-detail"><a href="../pages/order.html?${result._id}"><button class="btn submit-btn details">DETAILS</button></a></td>
          </tr>  
        `;
    }
  } catch (error) {
    // handle server down error
    alert(error);
  }
}


getOrder();
