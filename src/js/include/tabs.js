(function ($) {

    var tabs = 'js-tabs';

    var $tabs = $('.' + tabs),
        $navTab = $tabs.find('button'),
        $content = $('.contact .tab-pane');

    var active = 'active';

    var Services = {
        /**
         * @access public
         */
        init: function () {
            this.event();
        },

        event: function () {
            var self = this;
            $navTab.on('click', function () {
                self.showContent($(this));
            });
        },

        /**
         * TODO
         * Show/hide children service
         *
         * @param {object} el - parent dom element
         */
        showContent: function (el) {

            //Является ли текущий элемент раскрытым?
            if(el.hasClass(active)) {

            } else {
                $navTab.removeClass(active);
                $content.removeClass(active);
                el.addClass(active);
                $('#' + el.data('to')).addClass(active);
            }

        }
    };

    Services.init();

})($);
