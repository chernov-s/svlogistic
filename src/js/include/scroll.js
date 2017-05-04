var Scroll = (function($) {

    var settings = {

    };

    var $fullPage = $('.js-full-page');

    var ascensor = null,
        ascensorInstance = null,
        fullpageInstance = null,
        numberCurrentSection = 0;

    var __ = {
        /*
         * @access public
         */
        init: function () {
            /*================================================
             ASCENSOR
             https://github.com/kirkas/Ascensor.js
             =================================================*/
            ascensor = $('.js-pages').ascensor({
                direction: 'x',
                keyNavigation: true
            });
            ascensorInstance = ascensor.data('ascensor');
            ascensor.on("scrollStart", function(e, floor){
                numberCurrentSection = floor.to;
            });
            /*================================================
             FULL PAGE
             https://github.com/alvarotrigo/fullPage.js
             =================================================*/
            var self = this;
            fullpageInstance = $fullPage.fullpage({
                anchors: Navigation.anchor,
                sectionSelector: '.b-pages__item',
                menu: '#menu',
                scrollingSpeed: 1000,
                onLeave: function(index, nextIndex, direction){
                    numberCurrentSection = nextIndex - 1;
                    ascensorInstance.scrollToFloor(numberCurrentSection);
                }
            });

            this._event();
        },

        _event: function () {
            var self = this;
            self._keyPressHandler();
        },

        _keyPressHandler: function () {
            $(window).keydown(function (e) {
                var d = e.keyCode || e.which; // IE
                if (!$("input, textarea, button").is(":focus")) switch (d) {
                    case 37:
                    case 65:
                    case 39:
                    case 68:
                        Navigation.setActiveSidebarItem(numberCurrentSection);
                        $.fn.fullpage.moveTo(numberCurrentSection + 1);
                        break;
                }
            });
        },

    };

    return {
        init: function() { return __.init(); }
    };

})($);