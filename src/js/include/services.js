(function ($) {

    var detail = 'services-list__detail',
        serviceItem = 'js-srv-item',
        serviceList = 'services-list';

    var $services = $('.' + serviceItem),
        $serviceList = $('.' + serviceList),
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
         * TODO
         * Show/hide children service
         *
         * @param {object} el - parent dom element
         */
        toggleDetail: function (el) {
            //Очищаем раскрывшийся список услуг
            $detail.empty();
            $detail.removeClass('offset-bottom');
            $detail.removeClass('offset-top');
            //Является ли текущий элемент раскрытым?
            if(el.hasClass(active)) {
                $services.removeClass(active);
                $detail.removeClass(active);
                this.toDefault();
                $detail.hide();
            } else {
                //Номер строки
                var row = Math.abs(el.data('row') - 1);

                //Добавляем класс для того, чтобы добавить отступ сверху либо снизу
                if(row) {
                    $detail.addClass('offset-bottom');
                } else {
                    $detail.addClass('offset-top');
                }
                $services.removeClass(active);
                el.addClass(active);
                $detail.addClass(active);
                $detail.show();
                //Копируем дочерние элементы услуги в раскрытый элемент detail
                var child = el.find('.js-child').clone().appendTo('.' + detail);

                if(skel.breakpoint("xsmall").active) {

                    //Сжимаем все элементы, кроме активного
                    this.compressed( $services );
                    el.removeClass('compressed');

                    this.sort(el.index());
                } else {
                    //Сжимаем строку
                    this.compressed( $('.' + serviceItem + '[data-row="' + row + '"]') );
                }

            }


        },

        /*
         * Сортировка flex элементов (Используется в мобильной версии)
         * @param {number} index - номер активного элемента
         */
        sort: function (index) {
            if(index > 1)
                index -= 1;
            $services.each(function (i) {
                $(this).css('order', i * 2);
                if(index === i) {
                    $detail.css('order', i * 2 + 1);
                }
            });

        },

        /**
         * Change height of item element
         *
         * @param {object} $compressed - The DOM element to which we will assign a class 'small'
         */
        compressed: function($compressed) {
            this.toDefault();
            $serviceList.addClass(active);
            $compressed.addClass('compressed');
        },


        toSmall: function (row) {


            $compressed = $('.' + serviceItem + '[data-row="' + row + '"]');
            $compressed.addClass('compressed');
        },

        toDefault: function () {
            $services.removeClass('compressed');
            $serviceList.removeClass(active);
        }
    };

    Services.init();

})($);
