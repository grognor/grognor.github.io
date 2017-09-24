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

  function countMemories () {
    $.ajax({
      url: "https://spreadsheets.google.com/feeds/list/1Nsth47pK8zYoMxtf_Q1PGQBYbegyhQxZCfg-AEMbJ1U/od6/public/values?alt=json-in-script&callback=DELETEME",
      done: function(data) {
        var x = data.responseText;
        x = x.replace("DELETEME(", "");
        x = x.replace("// API callback", "");
        x = x.substring(0, x.length - 2);
        console.log($.parseJSON(x).feed.entry);
      }
    });
  }

});
