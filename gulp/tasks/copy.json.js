'use strict';

module.exports = function() {

  $.gulp.task('copy:json', function() {
    return $.gulp.src('src/js/data.json')
      .pipe($.gulp.dest($.config.root + '/assets/js'))
  })

};
