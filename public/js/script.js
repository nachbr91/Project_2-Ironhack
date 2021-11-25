// Variable
// showFlashMessage((element) => {
//   const event = new CustomEvent('showFlashMessage');
//   element.dispatchEvent(event);
// });

// const flashMessage = document.getElementsByClassName('error-flash-message');
// show


const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

if (prefersDarkScheme.matches) {
  document.body.classList.add("dark-theme");
} else {
  document.body.classList.remove("dark-theme");
}