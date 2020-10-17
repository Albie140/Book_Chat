$( "a" ).click(function() {
    $("span", this).toggle();

      });

      $(document).ready(function() {
        // $( "a" ).click(function() {
        //   $("span", this).toggle();
      
        //     });
        //parallax scroll
        $(window).on("load scroll", function() {
          var parallaxElement = $(".parallax_scroll"),
            parallaxQuantity = parallaxElement.length;
          window.requestAnimationFrame(function() {
            for (var i = 0; i < parallaxQuantity; i++) {
              var currentElement = parallaxElement.eq(i),
                windowTop = $(window).scrollTop(),
                elementTop = currentElement.offset().top,
                elementHeight = currentElement.height(),
                viewPortHeight = window.innerHeight * 1.4 - elementHeight * 0.5,
                scrolled = windowTop - elementTop + viewPortHeight;
              currentElement.css({
                transform: "translate3d(0," + scrolled * -0.15 + "px, 0)"
              });
            }
          });
        });
      }); 
      
      

      $.fn.stars = function() {
        return $(this).each(function() {
            // Get the value
            var val = parseFloat($(this).html());
            // Make sure that the value is in 0 - 5 range, multiply to get width
            var size = Math.max(0, (Math.min(5, val))) * 18;
            // Create stars holder
            var $span = $('<span />').width(size);
            // Replace the numerical value with stars
            $(this).html($span);
        });
    }
    $(function() {
      $('span.stars').stars();
  });