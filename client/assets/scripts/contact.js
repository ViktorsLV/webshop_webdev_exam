// FIREBASE
var firebaseConfig = {
    apiKey: "AIzaSyAASiJtXl0sff2rPWtfZHY-XOwGrmX2T7E",
    authDomain: "contact-form-portfolio-5f1e2.firebaseapp.com",
    databaseURL: "https://contact-form-portfolio-5f1e2.firebaseio.com",
    projectId: "contact-form-portfolio-5f1e2",
    storageBucket: "contact-form-portfolio-5f1e2.appspot.com",
    messagingSenderId: "83498717699",
    appId: "1:83498717699:web:17dc27fd1565a97252f436",
    measurementId: "G-ZQQVCQT0QW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

/* _______________________________________________________ */

const messagesRef = firebase.database().ref('messages')

// Submit form
document.getElementById('contact-form').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();

    // Get values
    const name = getInputValue('name');
    const subject = getInputValue('subject');
    const email = getInputValue('email');
    const message = getInputValue('message');

    saveMessage(name, subject, email, message);

    // Show alert
    document.querySelector('.alert').style.display = 'block';

    // Hide alert after 3 sec
    setTimeout(function(){
        document.querySelector('.alert').style.display = 'none';
    }, 3000)

    //Clear contact form fields
    document.getElementById('contact-form').reset()
}

// Getting form values ^
function getInputValue(id) {
    return document.getElementById(id).value;
}

// Saving messages to firebase 
function saveMessage(name, subject, email, message) {
    const newMessageRef = messagesRef.push();
    newMessageRef.set({
        name: name,
        subject: subject,
        email: email,
        message: message
    })
}

// source: https://www.youtube.com/watch?v=PP4Tr0l08NE (Traversy Media)
//https://console.firebase.google.com/project/contact-form-portfolio-5f1e2/database/contact-form-portfolio-5f1e2/data