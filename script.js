var navLinks = document.getElementById("navLinks");
var mybutton = document.getElementById("myBtn");

function showMenu() {
  navLinks.style.display = "block";
  setTimeout(function() {
    navLinks.style.right = "0";
  }, 10);
  
  
}

function hideMenu() {
  navLinks.style.right = "-200px";
  setTimeout(function() {
    navLinks.style.display = "none";
  }, 10);
  
}

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  window.scrollTo({top: 0, behavior: 'smooth'});
}