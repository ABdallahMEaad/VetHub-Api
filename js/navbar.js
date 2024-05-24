(function ($) {
    "use strict";
  
    // Document ready function
    $(document).ready(function() {
      // Initialize niceSelect for select elements
      $('select').niceSelect();
  
      // Initialize owlCarousel for client reviews
      var review = $('.client_review_part');
      if (review.length) {
        review.owlCarousel({
          items: 1,
          loop: true,
          dots: true,
          autoplay: true,
          autoplayHoverPause: true,
          autoplayTimeout: 5000,
          nav: false,
          smartSpeed: 2000,
        });
      }
  
      // Initialize Mailchimp
      mailChimp();
    });
  
    // Window scroll function
    $(window).scroll(function () {
      var window_top = $(window).scrollTop() + 1;
      if (window_top > 50) {
        $('.main_menu').addClass('menu_fixed animated fadeInDown');
      } else {
        $('.main_menu').removeClass('menu_fixed animated fadeInDown');
      }
    });
  
    // Mailchimp initialization function
    function mailChimp() {
      $('#mc_embed_signup').find('form').ajaxChimp();
    }
  
  }(jQuery));