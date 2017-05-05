(function(global, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], function($) {
            return factory($, global, global.document, global.Math);
        });
    } else if (typeof exports === "object" && exports) {
        module.exports = factory(require('jquery'), global, global.document, global.Math);
    } else {
        factory(jQuery, global, global.document, global.Math);
    }
})(typeof window !== 'undefined' ? window : this, function($, window, document, Math, undefined) {

    $(document).ready(function () {


        //=require include/*.js

        var App = (function ($) {

            var debug = true;

            return {
                init: function () {
                    /*================================================
                     LOADING
                     =================================================*/
                    AssetsLoader.init();

                    Navigation.init();

                    Scroll.init();

                    /*================================================
                     SLICK
                     https://github.com/kenwheeler/slick
                     =================================================*/

                    $('.js-home-slick').slick({
                        autoplay: false,
                        autoplaySpeed: 10000,
                        dots: true
                    });

                    $('.js-review').slick({
                        autoplay: false,
                        autoplaySpeed: 10000,
                        dots: true,
                        customPaging : function(slider, i) {
                            var cl = $(slider.$slides[i]).data('dot');
                            return '<a class="' + cl + '" href="javascript:void(0)">&nbsp;</a>';
                        }
                    });

                    $('.js-auto-park').slick({
                        autoplay: false,
                        autoplaySpeed: 10000,
                        dots: true,
                        slidesToShow: 2,
                        slidesToScroll: 1
                    });


                    $('.js-slick-about').slick({
                        autoplay: false,
                        autoplaySpeed: 10000,
                        dots: true,
                        infinite: true,
                        fade: true,
                        cssEase: 'cubic-bezier(0.18, 0.89, 0.32, 1.28)',
                        customPaging : function(slider, i) {
                            //Change default dots
                            var _date = $(slider.$slides[i]).data("year");
                            return '<button>' + _date + '</button>';
                        }
                    })
                        .on('beforeChange', function(event, slick, currentSlide, nextSlide){
                            //Change background
                            var _bgNext = $(slick.$slides[nextSlide]).data("bg"),
                                _bgCur = $(slick.$slides[currentSlide]).data("bg");
                            $('.js-bg-about').removeClass(_bgCur).addClass(_bgNext);

                            //Add a class to the elements that stand before the active element
                            //TODO: Вроде работает, но нужно улучшить этот кусок:)
                            var $dotsAbout = $('.js-slick-about ul.slick-dots > li');
                            $dotsAbout.removeClass('complete');
                            $dotsAbout.each(function (index, el) {
                                if(index <= nextSlide) {
                                    $(el).addClass('complete');
                                }
                            });
                        });

                    /*
                     * Masked Input Plugin for jQuery
                     * https://github.com/digitalBush/jquery.maskedinput
                     */
                    $('.js-phone').mask('+7 (999) 999-99-99');

                },

                /** @type {function(...*)} */
                log: function () {
                    if (debug)
                        console.log.apply(console, arguments)
                }
            }
        })($);
        App.init();
    });
});