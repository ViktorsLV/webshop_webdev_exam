const baseUrl = 'http://localhost:5000/api'
const localStorage = window.localStorage;

/* REGISTERING USER */
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const newEmail = document.querySelector('#newEmail');
const newPassword = document.querySelector('#newPassword');
const registerButton = document.querySelector('#registerButton');

// custom function to show alert
const showAlert = (msg, el) => {
  el.style.display = "block"; // change alert visibility on HTML page
  el.innerHTML = `${msg}`; // add text for alert
  setTimeout(function () {
    el.parentNode.removeChild(el); // remove alert from form after 5 seconds
  }, 5000);
};

async function registerUser(data) {
  try {
    const response = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data),
    })
    if (response.status >= 400 ) {
      console.log(response)
      const text = "Invalid details"
      showAlert(text, alertError); 
    } 
    else if (response.status >= 200) { // or === 200
      const result = await response.json();
      const text = "Welcome!"
      showAlert(text, alertSuccess)
      console.log(result)
      localStorage.setItem('token', result.token);
      location.href = 'http://127.0.0.1:5500/client/assets/pages/shop.html';
    } 
  } catch (error) {
    // handle server down error
    alert(error);    
  }
}

// add handler on register form button click
registerButton.addEventListener('click', (e) => {
    e.preventDefault();

    // check if the fields are not empty
    if(!(firstName.value && lastName.value && newEmail.value && newPassword.value)) {
      const text = "Required fields must be filled!"
      showAlert(text, alertError)
    } else {
      const data = {firstName: firstName.value, lastName: lastName.value, email: newEmail.value, password: newPassword.value}
      registerUser(data);
    }
}); 