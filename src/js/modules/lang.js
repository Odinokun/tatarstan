module.exports = function() {

  // begin language switcher
  $('.lang__item').on('click', function(e) {
    e.preventDefault();

    $('.lang__item').removeClass('active');
    $(this).addClass('active');
  });
  // end language switcher

};