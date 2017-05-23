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
                Scroll.fullPageDisable(false);
            });
            $modal.on('hidden.bs.modal', function () {
                $btnModal.removeClass(active);
                Scroll.fullPageDisable(true);
            })
        }
    };

    Modal.init();

})($);
