const baseUrl = 'http://localhost:5000/api'
const localStorage = window.localStorage;
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

loginButton.addEventListener('click', (e) =>{
    e.preventDefault();

    if(!(loginEmail.value && loginPassword.value)) {
      const text = "Email and password must be filled!"
      showAlert(text, alertError)
    } else {
      const data = { email: loginEmail.value, password: loginPassword.value}

      fetch(`${baseUrl}/auth/login`, {
          method: 'POST', 
          // mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then(response =>  response.json())
        .then((result) => {
          if (result.error ) {
            const text = "Login unsuccessful, please try again..."
            showAlert(text, alertError);
          } else {
            const text = "Login successful!"
            showAlert(text, alertSuccess)
            console.log(result)
            localStorage.setItem('token', result.token);
            location.href = 'http://127.0.0.1:5500/client/assets/pages/shop.html';
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });

        // const xhttp = new XMLHttpRequest();

        // xhttp.onreadystatechange = function(){
        //     if(this.readyState == 4 && this.status == 200){
        //         alertBox.innerHTML = `Login Successful`;
        //         const data = JSON.parse(xhttp.responseText);
        //         console.log(data);

        //         localStorage.setItem('currentUser', xhttp.responseText);
        //         location.href = 'http://127.0.0.1:5500/client/posts.html';
        //     }
        //     if (this.readyState == 4 && this.status >= 400){
        //         alertBox.innerHTML = `Login unsuccessful, error: ${this.status}`;
        //     }
        // };
        // xhttp.open('POST', 'http://127.0.0.1:8577/api/login');
        // xhttp.setRequestHeader('Content-Type', 'application/json');

        // const payload = {
        //     userEmail: loginEmail.value,
        //     password: loginPW.value
        // }

        // if (localStorage.getItem('currentUser')){
        //     const {token} = JSON.parse(localStorage.getItem('currentUser'));
        //     xhttp.setRequestHeader('x-authentication-token', token);
        // }

        // xhttp.send(JSON.stringify(payload));
    }
});