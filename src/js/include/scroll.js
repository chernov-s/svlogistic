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

            var self = this;

            /*================================================
             ASCENSOR
             https://github.com/kirkas/Ascensor.js
             =================================================*/
            ascensor = $('.js-pages').ascensor({
                direction: 'x',
                keyNavigation: true,
                swipeNavigation: false
            });
            ascensorInstance = ascensor.data('ascensor');
            ascensor.on("scrollStart", function(e, floor){
                numberCurrentSection = floor.to;
                //TODO: Предполагается, что видео находится только на первой секции. Если видео будет на нескольких сикциях, то необходимо будет это доработать
                numberCurrentSection == 0 && self._playVideo();
            });
            /*================================================
             FULL PAGE
             https://github.com/alvarotrigo/fullPage.js
             =================================================*/
            fullpageInstance = $fullPage.fullpage({
                anchors: Navigation.anchor,
                sectionSelector: '.b-pages__item',
                menu: '#menu',
                scrollingSpeed: 1000,
                onLeave: function(index, nextIndex, direction){

                    numberCurrentSection = nextIndex - 1;
                    ascensorInstance.scrollToFloor(numberCurrentSection);
                    Navigation.toggleSideBar(true);
                }
            });



            this._event();
        },

        _event: function () {
            var self = this;
            self._keyPressHandler();
            $( window ).resize(function () {
                self._resize();
            });
            self._resize();
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

        /*
         * Запускаем видео, так как при смене секции это видео останавливается.
         */
        _playVideo: function () {
            $('.js-video').get(0).play();
        },
        
        _resize: function () {
            if(skel.vars.mobile || skel.breakpoint("small").active) {
                $('body').css('overflow-y', 'auto');
                // Mobile: Отключаемплагин fullpage
                this.fullPageDisable(false);
            } else {
                $('body').css('overflow', 'hidden');
                this.fullPageDisable(true);
            }
        },

        /*
         * Отключаем/включаем плагин fullpage
         *
         * @params {boolean} isActive
         */
        fullPageDisable: function (isActive) {
            if(isActive && (skel.vars.mobile || skel.breakpoint("small").active)) {
                isActive = false;
            }
            $.fn.fullpage.setMouseWheelScrolling(isActive);
            $.fn.fullpage.setAllowScrolling(isActive);
        }

    };

    return __;

})($);