// Popup box idea from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal

window.addEventListener("load", function() {
  var popup = document.getElementById("popup");
  var addButton = document.getElementById("addButton");

  // var popupInner = document.getElementById("popupInner");

  var close = document.getElementById("cancel");

  addButton.onclick =function() {
    popup.style.display = "block";
  }

  close.onclick = function() {
    popup.style.display = "none";
  }
});
// add when user clicks away
