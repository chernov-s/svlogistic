(function ($) {

    const active = 'active';

    var $btnModal = $('*[data-toggle="modal"]'),
        $modal = $('.modal');

    var Modal = {
        /**
         * @access public
         */
        init: function () {
            this.event();
        },

        event: function () {
            var self = this;
            $btnModal.on('click', function () {
                $(this).addClass(active);
                self._toogleModal(false);
            });
            $modal.on('hidden.bs.modal', function () {
                $btnModal.removeClass(active);
                self._toogleModal(true);
            })
        },
        /*
         * Отключаем/включаем плагин fullpage когда открыты модальные окна
         *
         * @params {boolean} isActive
         */
        _toogleModal: function (isActive) {
            $.fn.fullpage.setMouseWheelScrolling(isActive);
            $.fn.fullpage.setAllowScrolling(isActive);
        },
    };

    Modal.init();

})($);
