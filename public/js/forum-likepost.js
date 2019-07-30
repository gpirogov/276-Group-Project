window.addEventListener("load", function() {
  var likes = document.getElementsByClassName("fa-thumbs-up")[0];
  var likesBtn = document.getElementsByClassName("iconBtn")[0];
  likesBtn.onclick = function() {
    likes.className = "fas fa-thumbs-up";
  }
});

function addLike() {
  $.ajax({
    url:'/forumLikePost',
    type:'post',
    data:$('iconForm').serialize(),
    success: function(){
        // pls do nothing thx
        console.log("liked");
    }
  });
  return true;
}
