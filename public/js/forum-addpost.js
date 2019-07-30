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

function checkAddPostForm() {
  var form = document.forms.addForm
  var title = form.elements.title.value;
  // var content = document.getElementsByClassName("addForm")["content"].value;
  var content = form.elements.content.value;

  if(title == "" || content == "" || title == null || content == null) {
    alert("Please fill out all fields");
    return false;
  }
  return true;
}
