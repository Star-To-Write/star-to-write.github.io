const menuToggle = document.getElementById('menuToggle');         // Hamburger menu button
const navMenu = document.getElementById('navMenu');               // Main navigation menu container
const submissionsToggle = document.getElementById('submissionsToggle'); // "Submissions" dropdown trigger
const subsList = document.getElementById('subsList');             // Submissions dropdown list
const overlay = document.getElementById('overlay');               // Screen overlay for mobile menu


// pressing hamburger menu
menuToggle.addEventListener('click', () => {
  // Toggle hamburger "active" state and menu visibility
  menuToggle.classList.toggle('active');
  navMenu.classList.toggle('show');

  // Ensure submissions dropdown is closed when main menu toggles
  if (subsList.classList.contains('show')) {
    subsList.classList.remove('show');
  }

  // Show or hide overlay depending on menu state
  if (navMenu.classList.contains('show')) {
    overlay.classList.remove('d-none');
  } else {
    overlay.classList.add('d-none');    
  }
});


// Submissions submenu
submissionsToggle.addEventListener('click', (e) => {
  e.preventDefault(); // prevent javascript from being naughty naughty
  subsList.classList.toggle('show');
});


overlay.addEventListener('click', () => {
  overlay.classList.add('d-none');   // Hide overlay
  navMenu.classList.remove('show');  // Hide main menu
  subsList.classList.remove('show'); // Hide submissions dropdown
  menuToggle.classList.remove('active'); // Reset hamburger icon
});

// yes i know this is janky, yes i know there must be a better way, i did this at 3am and i woke up at 6am the day before <3
const navbar = document.querySelector('.nav-scroll');
let scrollThreshold = 200; // scroll distance before auto-hide kicks in
let lastScroll = 0;        // tracks last scroll position

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  // If near the top of the page, always show navbar
  if (currentScroll < scrollThreshold) {
    navbar.classList.remove('nav-hidden');
    lastScroll = currentScroll;
    return;
  }

  // Hide navbar when scrolling down
  if (currentScroll > lastScroll) {
    navbar.classList.add('nav-hidden');

  // Show navbar when scrolling up
  } else if (currentScroll < lastScroll) {
    navbar.classList.remove('nav-hidden');
  }

  // Update last scroll position
  lastScroll = currentScroll;
});