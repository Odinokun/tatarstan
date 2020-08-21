module.exports = function() {

  // begin language switcher
  $('.panel__3-dots').on('click', function(e) {
    e.preventDefault();

    $('.panel__item--social').toggleClass('active');
  });
  // end language switcher

};