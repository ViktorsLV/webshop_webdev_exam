/* NAV MENU */
// Selecting items from HTML
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const menuNav = document.querySelector('.menu-nav');
const menuLogo = document.querySelector('.menu-logo'); // all of the above need adding classes
const navItems = document.querySelectorAll('.nav-item'); // needs looping through 

// Setting state of menu 
let showMenu = false;

menuBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
    menuBtn.classList.toggle('close');
    menu.classList.toggle('show');
    menuNav.classList.toggle('show');
    menuLogo.classList.toggle('show');
    navItems.forEach(item => item.classList.toggle('show'));
    showMenu = !showMenu;
}

/* THEME CHANGER */
let themeDots = document.getElementsByClassName('theme-dot')

/* local storage */
let theme = localStorage.getItem('theme')
if (theme == null) {
    setTheme('light')
} else {
    setTheme(theme)
}

for (i=0; themeDots.length > i; i++) {
    themeDots[i].addEventListener('click', function(){
        let mode = this.dataset.mode
        setTheme(mode);
    })
}

function setTheme(mode) {
    if (mode == 'light') {
        document.getElementById('theme-style').href= 'assets/styles/default.css'
    }
    if (mode == 'blue') {
        document.getElementById('theme-style').href= 'assets/styles/blue.css'
    }
    localStorage.setItem('theme', mode)
}


/* BATTERY CHARGE ANIMATION */

function chargeBattery() {
    let battery = document.getElementById('battery');
    battery.innerHTML = "&#xf244;";
    setTimeout(function(){
        battery.innerHTML = "&#xf243;";
    }, 1000)
    setTimeout(function(){
        battery.innerHTML = "&#xf242;";
    }, 2000)
    setTimeout(function(){
        battery.innerHTML = "&#xf241;";
    }, 3000)
    setTimeout(function(){
        battery.innerHTML = "&#xf240;";
    }, 4000)
}

chargeBattery();

// Run Animation every 5 Seconds
setInterval(chargeBattery, 5000)


// refreshing page on home when clicking on skills
const refreshSkills = document.querySelector('.refresh')

const refreshPage = () => {
    location.reload();
    // console.log('here');
}

refreshSkills.addEventListener('click', refreshPage);