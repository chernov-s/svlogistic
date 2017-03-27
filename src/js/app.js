$(document).ready(function() {
    var App = (function($){

        var debug = true;

        return {
            init: function () {
                FullPage.init();
                // $scroll = $("html").niceScroll({
                //     touchbehavior:true,
                //     cursorcolor:"#000",
                //     cursoropacitymax:0.6,
                //     cursorwidth:8,
                //     scrollspeed: 20,
                // });

            },

            /** @type {function(...*)} */
            log: function() {
                if(debug)
                    console.log.apply(console, arguments)
            },

            getScroll: function () {
                return $scroll;
            }
        }
    })($);
   App.init();
});
