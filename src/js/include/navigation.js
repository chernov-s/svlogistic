var Navigation = (function($) {

    var items = [];

    const BTN_NEXT_PAGE = 'b-pages__item-next';

    var $pages = $('.b-pages__item'),
        $sidebar = $('.b-sidebar__list');

    var __ = {
        /*
         * @access public
         */
        init: function () {
            this.setItems();
            this.renderSidebar();
            this.renderNextPageBtn();
            this.event();
        },
        /*
         * @access public
         * @param {integer} n - item number in the sitebar
         */
        setActiveSidebarItem: function (n) {
            var $item = $sidebar.find('li');
            $item.removeClass('active');
            $($item[n]).addClass('active');
        },

        setItems: function () {
            $pages.each(function (i, e) {
                items.push({
                    url: $(e).data("anchor") || 'home',
                    name: $(e).data("item") || 'Главная'
                });
            });
        },

        renderSidebar: function () {
            var html = "";
            items.forEach(function(item) {
                html += '<li data-menuanchor="' + item.url + '">'
                            + '<a href="#' + item.url + '" class="nav-link b-arrow">' + item.name + '</a>'
                        + '</li>';
            });

            $sidebar.html(html);
        },

        renderNextPageBtn: function () {
            var len = items.length, item = null;
            $pages.each(function (i, e) {
                if(i < len - 1) {
                    item = items[i + 1];
                    $(e).append('<a href="#' + item.url + '" class="' + BTN_NEXT_PAGE + ' b-arrow">' + item.name + '</a>');
                }
            });
        },

        anchor: items.map(function (item) {
            return item.url
        }),

        event: function () {

        }
    };

    return __;

})($);