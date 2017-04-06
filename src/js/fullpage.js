
var FullPage = (function($) {

    var fullPage = $('.b-content'),
        horizontalPage = $('.js-horizontal-page');

    var __ = {
        /*
         * @access public
         */
        init: function () {

            //this.event();
        },

        event: function () {
            var self = this;
            self.onResize();
            $(window).resize(function () {
                self.onResize();
            });
        },

        onResize: function () {
            var h = window.innerHeight - 20;
            for(var i = 0; i < horizontalPage.length; i++) {
                h -= $(horizontalPage[i]).height();
            }
            fullPage.height(h);
        }
    };

    return __;
})($);