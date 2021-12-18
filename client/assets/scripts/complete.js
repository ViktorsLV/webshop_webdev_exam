const orderRef = location.href.split("?")[1]; // orderRef from URL
if (orderRef) {
    const string = document.querySelector('#string')
    string.innerHTML += orderRef
}