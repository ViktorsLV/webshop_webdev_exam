const baseUrl = "http://localhost:5000/api";
const localStorage = window.localStorage;

/* REGISTERING USER */
const productImg = document.querySelector("#productImg");
const productName = document.querySelector("#productName");
const productPrice = document.querySelector("#productPrice");
const productBox = document.querySelector("#productBox");

async function fetchProducts() {
  try {
    const response = await fetch(`${baseUrl}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    if (response.status >= 400) {
      /* TODO: better error handling*/
      const text = "Something went wrong";
      console.log(response, text)
      // showAlert(text, alertError);
    }
    if (response.status >= 200) {
      const result = await response.json();
      console.log(result);
      result.forEach(r => {
        // <a href="http://127.0.0.1:5000/client/post.html?${r.postId}">
        productBox.innerHTML += `
        <div class="product">
          <img src="../${r.image}" alt="${r.image}">
          <h5>${r.name}</h5>
          <h4>$ ${r.price}</h4>
        </div>
        `;
    });
      /* TODO: draw HTML */
    }
  } catch (error) {
    alert(error);
  }
}

fetchProducts();

// async function registerUser(data) {
//   try {
//     const response = await fetch(`${baseUrl}/auth/register`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Origin': '*'
//       },
//       body: JSON.stringify(data),
//     })
//     if (response.status >= 400 ) {
//       console.log(response)
//       /* TODO: better error handling*/
//       const text = "Invalid details"
//       showAlert(text, alertError);
//     }
//     if (response.status >= 200) {
//       const result = await response.json();
//       const text = "Welcome!"
//       showAlert(text, alertSuccess)
//       console.log(result)
//       localStorage.setItem('token', result.token);
//       location.href = 'http://127.0.0.1:5500/client/assets/pages/shop.html';
//     }
//   } catch (error) {
//     // handle server down error
//     alert(error);
//   }
// }
