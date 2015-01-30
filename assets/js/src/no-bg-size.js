/*-------------------------------------------- */
/** Requires */
/*-------------------------------------------- */

var $ = require('jquery');

require('jquery-scrollTie');

/*-------------------------------------------- */
/** Parallax BG positions */
/*-------------------------------------------- */

$('.panel img').scrollTie({
    property: 'translateY',
    speed: 0.5,
    animateWhenOutOfView: true,
    reverseDirection: true,
    stopAtValue: -800
});