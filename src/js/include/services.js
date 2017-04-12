(function ($) {

    var detail = 'services-list__detail',
        serviceItem = 'services-list__item';

    var $services = $('.' + serviceItem),
        $detail = $('.' + detail);

    var setting = {
        defaultHeight: '50%',
        timer: 1000
    };

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
            $services.on('click', function () {
                self.toggleDetail($(this));
            });
        },

        /**
         * Show/hide children service
         *
         * @param {object} el - parent dom element
         */
        toggleDetail: function (el) {
            if(el.hasClass(active)) {
                $services.removeClass(active);
                $detail.removeClass(active);
                $detail.hide();
                $detail.empty();
                this.toDefault();
            } else {
                $detail.show();
                $detail.empty();
                $services.removeClass(active);
                el.addClass(active);
                $detail.addClass(active);
                var child = el.find('.js-child').clone().appendTo('.' + detail);
                this.toSmall(Math.abs(el.data('row') - 1), child.height());
            }
        },

        /**
         * Change height of item element
         *
         * @param {number} row
         * @param {number} childHeight - height of active js-child
         */
        toSmall: function (row, childHeight) {
            this.toDefault();

            $small = $('.' + serviceItem + '[data-row="' + row + '"]');

            var _h = $small.height() - childHeight;

            $small.addClass('small').height(_h);
        },

        toDefault: function () {
            $services.removeClass('small');
            $services.height(setting.defaultHeight);
        }
    };

    Services.init();

})($);
