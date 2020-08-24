ymaps.ready(init);

function init() {
  // координаты смещения иконки относительно её "ножки" (точки привязки).
  let x1 = 0;
  let y1 = 0;
  // координаты смещения иконки относительно её "ножки" (точки привязки) - при наведении.
  let x2 = 0;
  let y2 = 0;

  let myMap = new ymaps.Map('map', {
      center: [55.795691, 49.124787],
      zoom: 13
    }, {
      searchControlProvider: 'yandex#search'
    }),
    objectManager = new ymaps.ObjectManager({
      // Чтобы метки начали кластеризоваться, выставляем опцию.
      clusterize: false,
      // ObjectManager принимает те же опции, что и кластеризатор.
      gridSize: 32,
      clusterDisableClickZoom: true
    }),
    objectManagerUser = new ymaps.ObjectManager({
      clusterize: false,
      gridSize: 32,
      clusterDisableClickZoom: true
    });

  function addDefaultPoints() {
    // Чтобы задать опции одиночным объектам и кластерам,
    // обратимся к дочерним коллекциям ObjectManager.
    objectManagerUser.objects.options.set({
      hideIconOnBalloonOpen: false, // Убираем скрытие иконки при открытом балуне
      iconLayout: 'default#image', // Необходимо указать данный тип макета.
      iconImageHref: 'assets/img/marker-user.svg', // Своё изображение иконки метки.
      iconImageSize: [75, 75], // Размеры метки.
      iconImageOffset: [x1, y1], // Смещение иконки относительно её "ножки" (точки привязки).
      cursor: 'inherit' //Кастомный курсор при наведении
    });
    objectManager.clusters.options.set('preset', 'islands#invertedVioletClusterIcons');
    myMap.geoObjects.add(objectManager);
  }
  addDefaultPoints();

  function addUserPoints() {
    // Чтобы задать опции одиночным объектам и кластерам,
    // обратимся к дочерним коллекциям ObjectManager.
    objectManager.objects.options.set({
      hideIconOnBalloonOpen: false, // Убираем скрытие иконки при открытом балуне
      iconLayout: 'default#image', // Необходимо указать данный тип макета.
      iconImageHref: 'assets/img/marker-green.svg', // Своё изображение иконки метки.
      iconImageSize: [75, 75], // Размеры метки.
      iconImageOffset: [x1, y1], // Смещение иконки относительно её "ножки" (точки привязки).
      cursor: 'inherit' //Кастомный курсор при наведении
    });

    objectManagerUser.clusters.options.set('preset', 'islands#invertedVioletClusterIcons');
    myMap.geoObjects.add(objectManagerUser);
  }

  addUserPoints();


  function onObjectEvent(e) {
    let objectId = e.get('objectId');

    if (e.get('type') === 'mouseenter') {

      //открываем балун при наведении
      objectManager.objects.balloon.open(objectId);

      objectManager.objects.setObjectOptions(objectId, {
        iconLayout: 'default#image', // Необходимо указать данный тип макета.
        iconImageHref: 'assets/img/marker-hover.svg', // Своё изображение иконки метки.
        iconImageSize: [75, 75], // Размеры метки.
        iconImageOffset: [x2, y2], // Смещение иконки относительно её "ножки" (точки привязки).
        cursor: 'inherit' //Кастомный курсор при наведении
      });
    } else {
      objectManager.objects.setObjectOptions(objectId, {
        iconLayout: 'default#image', // Необходимо указать данный тип макета.
        iconImageHref: 'assets/img/marker-green.svg', // Своё изображение иконки метки.
        iconImageSize: [75, 75], // Размеры метки.
        iconImageOffset: [x1, y1], // Смещение иконки относительно её "ножки" (точки привязки).
        cursor: 'inherit' //Кастомный курсор при наведении
      });
    }
  }

  objectManager.objects.events.add(['mouseenter', 'mouseleave'], onObjectEvent);

  function onObjectEventUser(e) {
    let objectId = e.get('objectId');

    if (e.get('type') === 'mouseenter') {

      //открываем балун при наведении
      objectManagerUser.objects.balloon.open(objectId);

      objectManagerUser.objects.setObjectOptions(objectId, {
        iconLayout: 'default#image', // Необходимо указать данный тип макета.
        iconImageHref: 'assets/img/marker-hover.svg', // Своё изображение иконки метки.
        iconImageSize: [75, 75], // Размеры метки.
        iconImageOffset: [x2, y2], // Смещение иконки относительно её "ножки" (точки привязки).
        cursor: 'inherit' //Кастомный курсор при наведении
      });
    } else {
      objectManagerUser.objects.setObjectOptions(objectId, {
        iconLayout: 'default#image', // Необходимо указать данный тип макета.
        iconImageHref: 'assets/img/marker-user.svg', // Своё изображение иконки метки.
        iconImageSize: [75, 75], // Размеры метки.
        iconImageOffset: [x1, y1], // Смещение иконки относительно её "ножки" (точки привязки).
        cursor: 'inherit' //Кастомный курсор при наведении
      });
    }
  }

  objectManagerUser.objects.events.add(['mouseenter', 'mouseleave'], onObjectEventUser);


  //закрытие балуна по клику на карте
  myMap.events.add('click', function () {
    objectManager.objects.balloon.close();
    objectManagerUser.objects.balloon.close();
    myMap.balloon.close();
  });


  $.ajax({
    url: "assets/js/data.json"
  }).done(function(data) {
    objectManager.add(data);
  });
  $.ajax({
    url: "assets/js/data-user.json"
  }).done(function(data) {
    objectManagerUser.add(data);
  });


  //begin фильтр меток по переключателю
  $('.marker-switcher__switch').on('click', function () {
    let inputVal = $(this).find('input').val();

    if (inputVal === 'default') {
      myMap.geoObjects.remove(objectManager);
      myMap.geoObjects.remove(objectManagerUser);
      addDefaultPoints();

      $.ajax({
        url: "assets/js/data.json"
      }).done(function (data) {
        objectManager.add(data);
      });
      $.ajax({
        url: "assets/js/data-null.json"
      }).done(function (data) {
        objectManagerUser.add(data);
      });
    } else if (inputVal === 'user') {
      myMap.geoObjects.remove(objectManager);
      myMap.geoObjects.remove(objectManagerUser);
      addUserPoints();

      $.ajax({
        url: "assets/js/data-null.json"
      }).done(function (data) {
        objectManager.add(data);
      });
      $.ajax({
        url: "assets/js/data-user.json"
      }).done(function (data) {
        objectManagerUser.add(data);
      });
    } else {
      myMap.geoObjects.remove(objectManager);
      myMap.geoObjects.remove(objectManagerUser);
      addDefaultPoints();
      addUserPoints();

      $.ajax({
        url: "assets/js/data.json"
      }).done(function (data) {
        objectManager.add(data);
      });
      $.ajax({
        url: "assets/js/data-user.json"
      }).done(function (data) {
        objectManagerUser.add(data);
      });
    }
  });
  //end фильтр меток по переключателю

}



function popupVideo() {
    let dataYoutube = $('#video-popup__iframe').attr('data-youtube');

    $('#video-popup__iframe').html('<iframe src="https://www.youtube.com/embed/' + dataYoutube + '?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
    $('.popup').fadeIn();


  $('.popup__close').on('click', function (e) {
    e.preventDefault();

    $('.popup').fadeOut();
    $('#video-popup__iframe iframe').remove();
  });
}
popupVideo();

