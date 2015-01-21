/*-------------------------------------------- */
/** Requires */
/*-------------------------------------------- */

var $ = require('jquery');

require('jquery-scrollTie');

/*-------------------------------------------- */
/** Variables */
/*-------------------------------------------- */

var resizeTicker = 0;

var $panels = $('.panel'),
    $images = $('.panel img');

/*-------------------------------------------- */
/** Parallax BG positions */
/*-------------------------------------------- */

$images.scrollTie({
    property: 'translateY',
    speed: 0.5,
    animateWhenOutOfView: true,
    reverseDirection: true,
    stopAtValue: -800
});