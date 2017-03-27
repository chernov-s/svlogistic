
var FullPage = (function($) {

    var fullPage = $('.js-full-page'),
        horizontalPage = $('.js-horizontal-page');

    var __ = {
        /*
         * @access public
         */
        init: function () {

            /*================================================
             FULL PAGE
             https://github.com/alvarotrigo/fullPage.js
             =================================================*/
            $('#fullpage').fullpage({
                anchors:['home', 'service', 'facts'],
                continuousHorizontal: true,
                scrollHorizontally: true,
                easing: 'easeInOutCubic',
                easingcss3: 'ease',
                sectionSelector: '.b-pages__item'
            });
            this.event();
        },

        event: function () {
            var self = this;
            self.onResize();
            $(window).resize(function () {
                self.onResize();
            });
        },

        onResize: function () {
            // var h = window.innerHeight - 20;
            // for(var i = 0; i < horizontalPage.length; i++) {
            //     h -= $(horizontalPage[i]).height();
            // }
            // fullPage.height(h);
        }
    };

    return __;
})($);