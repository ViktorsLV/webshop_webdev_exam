const parentElement = document.querySelector("#itemDetails");
const select = document.querySelector("#select");
const remove = document.querySelector("#remove");
const clearCart = document.querySelector("#clearCart");
const totalPrice = document.querySelector("#totalPrice");

let cartItems = JSON.parse(localStorage.getItem("cart"));
if (!cartItems) {
  cartItems = [];
}

const countTotal = function () { 
	let total = 0;
	cartItems.forEach(item => {
		total += item.price;
	});
	return total;
}

function getCartItems() {
  if (cartItems.length > 0) {
    console.log(cartItems)
    const items = cartItems.map((product) => {
      let options = [...Array(product.countInStock).keys()].map((o) => {
        return `<option value="${o + 1}">${o + 1}</option>`;
      });

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
							<div id="div">
								<button class="cart-btn btn submit-btn" id="remove" onClick="removeItem('${product._id}')">Remove item</button>	
							</div>
						</div>
						`;
    });
    parentElement.innerHTML = items.join("");
    document.querySelector(".checkout").classList.remove("d-none");
    document.querySelector(".cart-checkout").classList.remove("d-none");
    totalPrice.innerHTML = '$' + countTotal();
  } else {
		document.querySelector(".checkout").classList.add("d-none");
    document.querySelector(".cart-checkout").classList.add("d-none");
    parentElement.innerHTML = '<h4 class="empty">Your shopping cart is empty</h4>';
  }
};
getCartItems();

clearCart.addEventListener("click", clear);

function removeItem(itemId) {
  // looking for Id which matches and returning new array
  const items = cartItems.filter(item => item._id !== itemId);
  // assigning new array to cartItems 
  cartItems = items // assign new array
  save() // changing localStorage to filtered array
  getCartItems() // refresh items
}

function clear() {
	cartItems = [];
	localStorage.removeItem("cart");
  getCartItems();
}

function save() { // function to save changes to localStorage
  localStorage.setItem('cart', JSON.stringify(cartItems));
}

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
