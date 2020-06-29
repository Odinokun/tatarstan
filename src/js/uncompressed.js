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

  function onObjectEvent (e) {
    var objectId = e.get('objectId');

    if (e.get('type') === 'mouseenter') {

      objectManager.objects.balloon.open(objectId);//открываем балун при наведении

      objectManager.objects.setObjectOptions(objectId, {
        iconLayout: 'default#image', // Необходимо указать данный тип макета.
        iconImageHref: 'assets/img/marker-2.png', // Своё изображение иконки метки.
        iconImageSize: [100, 100], // Размеры метки.
        iconImageOffset: [-55, -55], // Смещение иконки относительно её "ножки" (точки привязки).
        cursor: 'inherit' //Кастомный курсор при наведении
      });
    } else {
      objectManager.objects.setObjectOptions(objectId, {
        iconLayout: 'default#image', // Необходимо указать данный тип макета.
        iconImageHref: 'assets/img/marker.png', // Своё изображение иконки метки.
        iconImageSize: [40, 40], // Размеры метки.
        iconImageOffset: [-25, -25], // Смещение иконки относительно её "ножки" (точки привязки).
        cursor: 'inherit' //Кастомный курсор при наведении
      });
    }
  }
  objectManager.objects.events.add(['mouseenter', 'mouseleave'], onObjectEvent);

  //закрытие балуна по клику на карте
  myMap.events.add('click', function () {
    objectManager.objects.balloon.close();
    myMap.balloon.close();
  });

  $.ajax({
    url: "assets/js/data.json"
  }).done(function(data) {
    objectManager.add(data);
  });

}

$('.aside-bottom__btn').on('click', function (e) {
  e.preventDefault();
  $('.aside-bottom__btn').toggleClass('active');
});
