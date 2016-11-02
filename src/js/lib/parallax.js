(function ($) {

    $.fn.parallax = function () {
      // Parallax Scripts
      return this.each(function(i) {
        var $this = $(this);

        function updateParallax() {
          var $img = $this.children("img").first(),
              top = $this.offset().top,
              bottom = top + $this.height(),
              scrollTop = $(window).scrollTop(),
              windowHeight = window.innerHeight,
              parallax = scrollTop - top;
              

          if ((bottom > scrollTop) && (top < (scrollTop + windowHeight))) {
            $img.css('transform', "translate3D(0px," + parallax + "px, 0)");
          }

        }

        // Wait for image load
        $this.children("img").one("load", updateParallax).each(function() {
          if(this.complete) $(this).load();
        });

        $(window).scroll(function(){
          window.requestAnimationFrame(updateParallax);
        });

        $(window).resize(updateParallax);

      });

    };
}( jQuery ));