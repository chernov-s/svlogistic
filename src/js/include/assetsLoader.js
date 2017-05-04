var AssetsLoader = (function ($) {

    return {
        init: function () {
            var self = this;
            this._preCacheImg();
            $('#overlay').hide();
        },
        /*
         * Load img to cache
         */
        _preCacheImg: function () {
            $.fn.preload = function() {
                this.each(function() {
                    $('<img/>')[0].src = this;
                });
            };
        }
    }
})($);
