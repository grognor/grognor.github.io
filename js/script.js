$(document).ready(function() {

  var request;
  var $connie = $("#connie");
  var $memoryCount = $("#memory-count");
  var sheetId = "1Nsth47pK8zYoMxtf_Q1PGQBYbegyhQxZCfg-AEMbJ1U";
  var ip = 0;

  $.getJSON('//freegeoip.net/json/?callback=?', function(data) {
    ip = data.ip;
  });

  $(".btn").click(function() {
    if ($connie.hasClass("animated"))
      return 0;
    $connie.addClass("animated");
    $connie.css({ visibility: "visible" });
    $connie.css({ top: $(this).position().top, left: $(this).position().left });
    setTimeout(function(){
      $connie.css({ top: 0, left: $(window).width() });
      $memoryCount.html(parseInt($memoryCount.html()) + 1);
      recordMemory();
      setTimeout(function() {
        $connie.removeClass("animated");
        $connie.css({ top: -200, left: -200 });
      }, 5000);
    },5000);
  });

  function recordMemory() {

    if (request)
      request.abort();

    request = $.ajax({
      url: "https://script.google.com/macros/s/AKfycbyjGhZwCDhgiLREz0czvu69WYr1MtYhM0792qjw-HsYpCmUbWda/exec",
      type: "post",
      data: "ip=" + ip
    });

    request.done(function(response, textStatus, jqXHR) {
      console.log(response);
      countMemories();
    });

    request.fail(function(jqXHR, textStatus, errorThrown) {
      console.error( "The following error occurred: " + textStatus, errorThrown);
    });

  }

  function animateConnie() {
  }

  function countMemories () {
    $.ajax({
      url: "https://spreadsheets.google.com/feeds/list/" + sheetId + "/od6/public/values?alt=json-in-script&callback=DELETEME",
      complete: function(data) {
        var x = data.responseText;
        x = x.replace("DELETEME(", "");
        x = x.replace("// API callback", "");
        x = x.substring(0, x.length - 2);
        $("#memory-count").html($.parseJSON(x).feed.entry.length);
        $("#remember-button").css("opacity", 1);
      }
    });
  }
  countMemories();

  $(window).scroll(function() {    
    var scroll = $(window).scrollTop();
  
    if (scroll >= 100) {
      $(".nav").addClass("scrolling");
      $(".masthead-brand").fadeOut();
    } else {
      $(".nav").removeClass("scrolling");
      $(".masthead-brand").fadeIn();
    }
  });

});
