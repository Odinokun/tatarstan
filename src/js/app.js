$(function() {

  // begin SVG for IE
  require('./modules/svg4everybody')();

  // begin padding top in object page
  require('./modules/objectPaddingTop')();

  // begin language switcher
  require('./modules/lang')();

  // begin menu
  require('./modules/3dots-menu')();

  // begin Popup
  require('./modules/popup')();

});