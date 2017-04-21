(function ($) {

    var detail = 'services-list__detail',
        serviceItem = 'services-list__item',
        serviceList = 'services-list';

    var $services = $('.' + serviceItem),
        $serviceList = $('.' + serviceList),
        $detail = $('.' + detail);

    var setting = {
        defaultHeight: '50%',
        timer: 1000
    };

    var active = 'active';

    var Tabs = {
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
         * TODO
         * Show/hide children service
         *
         * @param {object} el - parent dom element
         */
        toggleDetail: function (el) {
            //Очищаем раскрывшийся список услуг
            $detail.empty();

            //Является ли текущий элемент раскрытым?
            if(el.hasClass(active)) {
                $services.removeClass(active);
                $detail.removeClass(active);
                this.toDefault();
                $detail.hide();
            } else {
                $services.removeClass(active);
                el.addClass(active);
                $detail.addClass(active);
                $detail.show();
                //Копируем дочерние элементы услуги в расрытый элемент detail
                var child = el.find('.js-child').clone().appendTo('.' + detail);
                this.toSmall(Math.abs(el.data('row') - 1), child.height());
            }


        },

        /**
         * Change height of item element
         *
         * @param {number} row - The line number to which we will assign a class 'small'
         * @param {number} childHeight - height of active js-child
         */
        toSmall: function (row, childHeight) {
            this.toDefault();
            $serviceList.addClass(active);
            $small = $('.' + serviceItem + '[data-row="' + row + '"]');
            $small.addClass('small');
        },

        toDefault: function () {
            $services.removeClass('small');
            $serviceList.removeClass(active);
        }
    };

    Tabs.init();

})($);
