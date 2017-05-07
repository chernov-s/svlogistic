var Navigation = (function($) {

    var items = [];

    const BTN_NEXT_PAGE = 'b-pages__item-next';

    var $pages = $('.b-pages__item'), // Get page data
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
         * @param {integer} n - item number in the sidebar
         */
        setActiveSidebarItem: function (n) {
            var $item = $sidebar.find('li');
            $item.removeClass('active');
            $($item[n]).addClass('active');
        },

        setItems: function () {
            $pages.each(function (i, e) {
                var el = $(e);
                items.push({
                    url: el.data("anchor") || 'home',
                    name: el.data("item") || 'Главная',
                    list: el.data("list") || null
                });
            });
        },

        renderSidebar: function () {
            var html = "", i = 0;
            items.forEach(function(item) {
                var childList = "";
                if(item.list[0].label !== undefined) {
                    //Parse JSON data from child element in $pages
                    childList += '<ul>';
                    for(i = 0; i < item.list.length; i++) {
                        childList += '<li><a href="'+ item.list[0].url +'" class="b-arrow">'+ item.list[0].label +'</a></li>';
                    }
                    childList += '</ul>';
                }
                html += '<li data-menuanchor="' + item.url + '">'
                            + '<a href="#' + item.url + '" class="nav-link b-arrow">' + item.name + '</a>'
                            + childList
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