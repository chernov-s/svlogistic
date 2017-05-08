(function ($) {

    var $about = $('.js-about'),
        $item = $('.js-about-item'),
        $slider = $('.js-slick-about');
        $dots = null;

    var About = {
        /**
         * @access public
         */
        init: function () {
            var self = this;

            $slider.slick({
                autoplay: false,
                autoplaySpeed: 10000,
                dots: true,
                infinite: true,
                fade: true,
                cssEase: 'cubic-bezier(0.18, 0.89, 0.32, 1.28)',
                customPaging : self.setDots
            }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                self.setBackground(nextSlide);
                self.setComplete(nextSlide);
            });
            self.setBackground(0);

            $dots = $('.js-slick-about ul.slick-dots > li');

        },

        /*
         * Change default dots
         */
        setDots: function (slider, i) {
            var _date = $(slider.$slides[i]).data("year");
            return '<button>' + _date + '</button><span class="dot"></span>';
        },

        /*
         * Add a class to the elements that stand before the active element
         * @param {number} nextSlide
         */
        setComplete: function (nextSlide) {
            $dots.removeClass('complete');
            $dots.each(function (index, el) {
                if(index <= nextSlide) {
                    $(el).addClass('complete');
                }
            });
        },

        /**
         * @param {number} index - number slide
         */
        setBackground: function (index) {
            var pathToImage = $($item[index]).data("image");
            $about.css('background-image', 'url(' + pathToImage + ')');
        }
    };

    About.init();

})($);
