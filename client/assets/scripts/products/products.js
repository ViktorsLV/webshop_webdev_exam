const baseUrl = "http://localhost:5000/api";

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
      const text = "Something went wrong";
      // console.log(response, text)
      showAlert(text, alertError);
    }
    if (response.status >= 200) {
      const result = await response.json();
      console.log(result);
      result.forEach(r => {
        productBox.innerHTML += `
        <a class="product" href="../pages/product.html?${r._id}">
          <div>
            <img src="../../../uploads/${r.image}" alt="${r.image}" class="product-image">
            <h5 class="no-spacing">${r.name}</h5>
            <h4 class="no-spacing price">$ ${r.price}</h4>
          </div>
        </a>
        `;
    });
    }
  } catch (error) {
    alert(error);
  }
}

fetchProducts();