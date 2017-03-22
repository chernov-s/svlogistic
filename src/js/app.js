var App = (function(){

    var debug = true;

    return {
        init: function () {
            
        },

        /** @type {function(...*)} */
        log: function() {
            if(debug)
                console.log.apply(console, arguments)
        },
    }
})();

App.init();