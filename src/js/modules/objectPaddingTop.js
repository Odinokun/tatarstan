module.exports = function () {

  // begin padding top in object page
  function videoPaddingTop() {
    if ($('#object-left__video').length > 0) {
      let videoPaddingTop = $('#object-left__video').offset().top;
      $('#object-right').css('padding-top', videoPaddingTop);
    }
  }

  $(window).resize(videoPaddingTop);
  videoPaddingTop();
  // end padding top in object page

};