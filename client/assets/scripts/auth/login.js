const baseUrl = 'http://localhost:5000/api'
const localStorage = window.localStorage;

/* LOG IN USER */
const loginEmail = document.querySelector('#loginEmail');
const loginPassword = document.querySelector('#loginPassword');
const loginButton = document.querySelector('#loginButton');
const alertSuccess = document.querySelector('#alertSuccess');
const alertError = document.querySelector('#alertError');

// custom function to show alert
const showAlert = (msg, el) => {
  el.style.display = "block"; // change alert visibility on HTML page
  el.innerHTML = `${msg}`; // add text for alert
  setTimeout(function () {
    el.parentNode.removeChild(el); // remove alert from form after 5 seconds
  }, 5000);
};

async function loginUser(data) {
  try {
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data),
    })
    if (response.status >= 400 ) {
      const text = "Email and/or password incorrect"
      showAlert(text, alertError); 
    } 
    if (response.status === 200) {
      const result = await response.json();
      const text = "Login successful!"
      showAlert(text, alertSuccess)
      console.log(result)
      localStorage.setItem('token', result.token);
      // location.href = 'http://127.0.0.1:5500/client/assets/pages/shop.html';
      location.href = 'file:///C:/Users/sfs11/Desktop/Vik/Code/WEB%20EXAM/client/assets/pages/shop.html';
    } 
  } catch (error) {
    // handle server down error
    alert(error);    
  }
}

// add handler on login form button click
loginButton.addEventListener('click', (e) => {
    e.preventDefault();

    // check if the fields are not empty
    if(!(loginEmail.value && loginPassword.value)) {
      const text = "Email and password must be filled!"
      showAlert(text, alertError)
    } else {
      /* destructuring obj */
      const data = { email: loginEmail.value, password: loginPassword.value}
      loginUser(data);
    }
});