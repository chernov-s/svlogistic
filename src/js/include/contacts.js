(function ($) {

    const tabs = 'js-tabs',
        active = 'active';

    var $tabs = $('.' + tabs),
        $navTab = $tabs.find('button'),
        $content = $('.contact .tab-pane');

    var Contacts = {
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

    Contacts.init();

})($);
