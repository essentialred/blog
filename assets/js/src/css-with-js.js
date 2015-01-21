/*-------------------------------------------- */
/** Requires */
/*-------------------------------------------- */

var $ = require('jquery');

require('jquery-scrollTie');

/*-------------------------------------------- */
/** Variables */
/*-------------------------------------------- */

var resizeTicker = 0;

var $panels = $('.panel');

/*-------------------------------------------- */
/** Parallax BG positions */
/*-------------------------------------------- */

$panels.scrollTie({
    property: 'backgroundPositionY',
    speed: 0.5,
    reverseDirection: true,
    stopAtValue: function() {
        return (($(window).height() * 2) - $panels.innerHeight()) * -1;
    }
});