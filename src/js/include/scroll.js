var Scroll = (function($) {

    var settings = {

    };

    var $fullPage = $('.js-full-page'),
        $link = $('.js-link');

    var ascensor = null,
        ascensorInstance = null;

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
                direction: 'x'
            });
            ascensorInstance = ascensor.data('ascensor');

            /*================================================
             FULL PAGE
             https://github.com/alvarotrigo/fullPage.js
             =================================================*/
            var self = this;
            $fullPage.fullpage({
                anchors: Navigation.anchor,
                sectionSelector: '.b-pages__item',
                menu: '#menu',
                onLeave: function(index, nextIndex, direction){
                    ascensorInstance.scrollToFloor(nextIndex - 1);
                },
                afterLoad: function(anchorLink, index){

                },
            });

            this.event();
        },

        event: function () {
            var self = this;
        }
    };

    return {
        init: function() { return __.init(); }
    };

})($);