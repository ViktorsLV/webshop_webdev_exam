const parentElement = document.querySelector("#itemDetails");
const select = document.querySelector("#select");

let cartItems = JSON.parse(localStorage.getItem("cart"));
if (!cartItems) {
  cartItems = [];
}

const getCartItems = function () {
  if (cartItems.length > 0) {
    const items = cartItems.map((product) => {
			// mapping through array with numbers (countInStock) and adding it into option dropdown
			let options = [...Array(product.countInStock).keys()].map(o => {
				return `<option value="${o + 1}">${o + 1}</option>`
			})
      return `
				<div class="flex-row cart-items">
						<div class="cart-img">
							<img src="../${product.image}" alt="${product.name}">
						</div>
						<div>
								<h5 class="cart-title">${product.name}</h5>
						</div>
						<div>
								<h5 class="cart-price">$ ${product.price}</h6>
						</div>
						<div class="cart-qty">
								<form action="">
										<select name="cars" id="select">
											${options}
										</select>
								</form>
						</div>
						<div>
								<button class="cart-btn btn submit-btn">remove</button>
						</div>
				</div>
			`;
    });
		parentElement.innerHTML = items.join("");
    document.querySelector(".checkout").classList.remove("d-none");
    // cartTotal.innerHTML = '$' + countTotal();
  } else {
    document.querySelector(".checkout").classList.add("d-none");
    parentElement.innerHTML =
      '<h4 class="empty">Your shopping cart is empty</h4>';
    // cartTotal.innerHTML = '';
  }
};

// function updateCartItems(product) { // 2
// 	for (let i = 0; i < cartItems.length; i++) {
// 		if (cartItems[i].id == product.id) {
// 			cartItems[i].count += 1;
// 			cartItems[i].price = cartItems[i].basePrice * cartItems[i].count;
// 			return;
// 		}
// 	}
// 	cartItems.push(product);
// }

getCartItems();