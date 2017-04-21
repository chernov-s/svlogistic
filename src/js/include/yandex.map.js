(function () {
    /*================================================
     Yandex map
     https://tech.yandex.ru/maps
     =================================================*/
    ymaps.ready(function () {
        var myMap = new ymaps.Map("map", {
                center: [42.957739, 132.433244],
                zoom: 9.5
            }, {
                searchControlProvider: 'yandex#search'
            }),

            myPieChart = new ymaps.Placemark([
                42.728206, 133.088482
            ], {
                // Зададим произвольный макет метки.
                iconLayout: 'default#pieChart',
                // Радиус диаграммы в пикселях.
                iconPieChartRadius: 30,
                // Радиус центральной части макета.
                iconPieChartCoreRadius: 10,
                // Стиль заливки центральной части.
                iconPieChartCoreFillStyle: '#ffffff',
                // Cтиль линий-разделителей секторов и внешней обводки диаграммы.
                iconPieChartStrokeStyle: '#ffffff',
                // Ширина линий-разделителей секторов и внешней обводки диаграммы.
                iconPieChartStrokeWidth: 3,
                // Максимальная ширина подписи метки.
                iconPieChartCaptionMaxWidth: 200
            });

        myMap.geoObjects
            .add(myPieChart)
            .add(new ymaps.Placemark([42.728206, 133.088482], {
                balloonContent: 'цвет <strong>воды пляжа бонди</strong>'
            }, {
                preset: 'islands#icon',
                iconColor: '#0095b6'
            }));
    });
})();