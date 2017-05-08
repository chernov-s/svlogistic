var AssetsLoader = (function ($) {

    var $images;

    return {
        init: function () {
            var self = this;
            $images = $('*[data-image]');
            this._preCacheImg();
            $('#overlay').hide();
        },
        /*
         * Load img to cache
         */
        _preCacheImg: function () {
            $.each($images, function(){
                var img = new Image();
                img.src = $(this).data('image');
            });
        }
    }
})($);
