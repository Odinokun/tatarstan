ymaps.ready(init);

function init () {
  var myMap = new ymaps.Map('map', {
      center: [55.76, 37.64],
      zoom: 13
    }, {
      searchControlProvider: 'yandex#search'
    }),
    objectManager = new ymaps.ObjectManager({
      // Чтобы метки начали кластеризоваться, выставляем опцию.
      clusterize: true,
      // ObjectManager принимает те же опции, что и кластеризатор.
      gridSize: 32,
      clusterDisableClickZoom: true
    });

  // Чтобы задать опции одиночным объектам и кластерам,
  // обратимся к дочерним коллекциям ObjectManager.
  objectManager.objects.options.set({
    hideIconOnBalloonOpen: false, // Убираем скрытие иконки при открытом балуне
    iconLayout: 'default#image', // Необходимо указать данный тип макета.
    iconImageHref: 'assets/img/marker.png', // Своё изображение иконки метки.
    iconImageSize: [40, 40], // Размеры метки.
    iconImageOffset: [-25, -25], // Смещение иконки относительно её "ножки" (точки привязки).
    cursor: 'inherit' //Кастомный курсор при наведении
  });

  objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');
  myMap.geoObjects.add(objectManager);

  $.ajax({
    url: "assets/js/data.json"
  }).done(function(data) {
    objectManager.add(data);
  });

}