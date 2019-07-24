// Popup box idea from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal

window.addEventListener("load", function() {
  var popup = document.getElementsByClassName("popup")[0];
  var addButton = document.getElementsByClassName("addButton")[0];

  // var popupInner = document.getElementById("popupInner");

  var close = document.getElementsByClassName("cancel")[0];

  addButton.onclick = function() {
    popup.style.display = "block";
  }

  close.onclick = function() {
    popup.style.display = "none";
  }
});
// add when user clicks away
