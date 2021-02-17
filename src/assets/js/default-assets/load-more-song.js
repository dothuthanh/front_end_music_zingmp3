$(document).ready(function(){
  $("#load-more-song").slice(0, 0).show();
  $("#loadMore").on("click", function(e){
    e.preventDefault();
    $("#load-more-song:hidden").slice(0, 1).slideDown();
    if($("#load-more-song:hidden").length == 0) {
      $("#loadMore").text("No Content").addClass("noContent");
    }
  });
})
