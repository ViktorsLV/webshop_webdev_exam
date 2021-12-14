const baseUrl = 'http://localhost:5000/api'
const localStorage = window.localStorage;

/* REGISTERING USER */
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const newEmail = document.querySelector('#newEmail');
const newPassword = document.querySelector('#newPassword');
const registerButton = document.querySelector('#registerButton');

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