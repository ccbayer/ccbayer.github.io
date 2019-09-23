(function() {

  $('.carousel').carousel({
    interval: false
  });

  $(window).scroll(function() {
    if ($(window).scrollTop() > 150) {
      $('.hdr a').addClass('scrolled');
    } else {
      $('.hdr a').removeClass('scrolled');
    }
  });

})();
