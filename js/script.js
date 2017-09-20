$(document).ready(function() {
  var $connie = $("#connie");
  var $memoryCount = $("#memory-count");
  $(".btn").click(function() {
    if ($connie.hasClass("animated"))
      return 0;
    $connie.addClass("animated");
    $connie.css({ visibility: "visible" });
    $connie.css({ top: $(this).position().top, left: $(this).position().left });
    setTimeout(function(){
      $connie.css({ top: 0, left: $(window).width() });
      $memoryCount.html(parseInt($memoryCount.html()) + 1);
      setTimeout(function() {
        $connie.removeClass("animated");
        $connie.css({ top: -200, left: -200 });
      }, 5000);
    },5000);
  });
});
