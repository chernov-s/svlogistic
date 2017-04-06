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
                    // $scroll = $("html").niceScroll({
                    //     touchbehavior:true,
                    //     cursorcolor:"#000",
                    //     cursoropacitymax:0.6,
                    //     cursorwidth:8,
                    //     scrollspeed: 20,
                    // });
                    Navigation.init();

                    Scroll.init();

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