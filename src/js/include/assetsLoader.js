var AssetsLoader = (function ($) {

    var images = [
        '/assets/img/about/2005.png',
        '/assets/img/about/2007.png',
        '/assets/img/about/2008.png',
        '/assets/img/about/2009.png',
        '/assets/img/about/2010.png',
        '/assets/img/about/current.png'
    ];

    return {
        init: function () {
            var self = this;
            $(window).on('load', function(){
                self._preCacheImg();
            });
        },
        /*
         * Load img to cache
         */
        _preCacheImg: function () {
            $.each(images, function(){
                var img = new Image();
                img.src = this;
            });
        }
    }
})($);
