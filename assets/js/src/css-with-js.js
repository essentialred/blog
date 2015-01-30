/*-------------------------------------------- */
/** Requires */
/*-------------------------------------------- */

var $ = require('jquery');

require('jquery-scrollTie');

/*-------------------------------------------- */
/** Parallax BG positions */
/*-------------------------------------------- */

$('.panel').scrollTie({
    property: 'backgroundPositionY',
    speed: 0.5,
    reverseDirection: true,
    stopAtValue: -800
});