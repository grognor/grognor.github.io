$(document).ready(function() {
  var $connie = $("#connie");
  var $memoryCount = $("#memory-count");
  $(".btn").click(function() {
    $connie.css({ visibility: "visible" });
    $connie.css({ top: $(this).position().top, left: $(this).position().left });
    setTimeout(function(){
      $connie.css({ top: 0, left: $(window).width() });
      $memoryCount.html(parseInt($memoryCount.html()) + 1);
    },5000);
  });
});
