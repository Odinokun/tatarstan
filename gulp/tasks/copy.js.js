'use strict';

module.exports = function() {

  $.gulp.task('copy:js', function() {
    return $.gulp.src([ 'src/js/uncompressed.js',
                        'src/js/animation.js',
                        'src/js/animation-popup.js',
                        'src/js/temp-menu.js'])
      .pipe($.gulp.dest($.config.root + '/assets/js'))
  })

};
