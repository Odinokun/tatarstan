// var myMap;
//
// // Дождёмся загрузки API и готовности DOM.
// ymaps.ready(init);
//
// function init () {
//   // Создание экземпляра карты и его привязка к контейнеру с
//   // заданным id ("map").
//   myMap = new ymaps.Map('map', {
//     // При инициализации карты обязательно нужно указать
//     // её центр и коэффициент масштабирования.
//     center: [55.76, 37.64], // Москва
//     zoom: 16
//   }, {
//     searchControlProvider: 'yandex#search'
//   });
//
//   var placemark = new ymaps.Placemark(myMap.getCenter(), {
//     // Содержимое заголовка балуна.
//     balloonContentHeader:
//     '<div class="balloon-top" style="background-image: url(assets/img/bg-balloon-top.jpg)"><div class="balloon-top__info"><h3 class="balloon-top__title">Казань</h3><h4 class="balloon-top__adress">ул. Петербургская</h4></div><div class="balloon-top__object"><img src="assets/img/monument.png" alt="monument"></div></div>',
//     // Зададим содержимое основной части балуна.
//     balloonContentBody:
//       '<div class="balloon-body"><div class="balloon-body__row"><span>ул. Петербургская, д 00</span></div><div class="balloon-body__row"><span>год основания:</span><span>9999</span></div><div class="balloon-body__row"><span>параметр:</span><span>значение</span></div></div>',
//     // Содержимое нижней части балуна.
//     balloonContentFooter:
//       '<div class="balloon-footer"><a href="#" class="balloon-footer__btn">Открыть объект</a></div>',
//     // Содержимое всплывающей подсказки.
//     hintContent: 'Название монумента'
//   },
//     {
//       // Опции.
//       // Необходимо указать данный тип макета.
//       iconLayout: 'default#image',
//       // Своё изображение иконки метки.
//       iconImageHref: 'assets/img/marker.png',
//       // Размеры метки.
//       iconImageSize: [40, 40],
//       // Смещение левого верхнего угла иконки относительно
//       // её "ножки" (точки привязки).
//       iconImageOffset: [-25, -25]
//     });
//
//
//   // Добавим метку на карту.
//   myMap.geoObjects.add(placemark);
//   // Откроем балун на метке.
//   placemark.balloon.open();
//
//
//   // document.getElementById('destroyButton').onclick = function () {
//   //   // Для уничтожения используется метод destroy.
//   //   myMap.destroy();
//   // };
//
// }



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

  var squareLayout = ymaps.templateLayoutFactory.createClass('<div class="active">$</div>');

                // Чтобы задать опции одиночным объектам и кластерам,
                // обратимся к дочерним коллекциям ObjectManager.
                // objectManager.objects.options.set('preset', 'islands#greenDotIcon');
                objectManager.objects.options.set({
                  hideIconOnBalloonOpen: false, // Убираем скрытие иконки при открытом балуне
                  iconLayout: 'default#image', // Необходимо указать данный тип макета.
                  iconImageHref: 'assets/img/marker.png', // Своё изображение иконки метки.
                  iconImageSize: [40, 40], // Размеры метки.
                  iconImageOffset: [-25, -25], // Смещение иконки относительно её "ножки" (точки привязки).
                  cursor: 'inherit' //Кастомный курсор при наведении
                });

  // // Чтобы задать опции одиночным объектам и кластерам,
  // // обратимся к дочерним коллекциям ObjectManager.
  // // objectManager.objects.options.set('preset', 'islands#greenDotIcon');
  // objectManager.objects.options.set({
  //   hideIconOnBalloonOpen: false, // Убираем скрытие иконки при открытом балуне
  //   iconLayout: squareLayout, // Необходимо указать данный тип макета.
  //   // iconImageHref: 'assets/img/marker.png', // Своё изображение иконки метки.
  //   // iconImageSize: [40, 40], // Размеры метки.
  //   // iconImageOffset: [-25, -25], // Смещение иконки относительно её "ножки" (точки привязки).
  //   cursor: 'inherit' //Кастомный курсор при наведении
  // });

  // console.log(objectManager.clusters);
  // console.log(objectManager.clusters.length);
  // for (let i = 0; i < )
  // console.log(objectManager.objects);
  objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');
  myMap.geoObjects.add(objectManager);


  //закрытие балуна по клику на карте
  myMap.events.add('click', function () {
    objectManager.objects.balloon.close();
  });




  function onObjectEvent (e) {
    var objectId = e.get('objectId');

    if (e.get('type') == 'mouseenter') {
      // Метод setObjectOptions позволяет задавать опции объекта "на лету".
      objectManager.objects.setObjectOptions(objectId, {
        iconLayout: 'default#image', // Необходимо указать данный тип макета.
        iconImageHref: 'assets/img/marker-2.png', // Своё изображение иконки метки.
        iconImageSize: [100, 100], // Размеры метки.
        iconImageOffset: [-55, -55], // Смещение иконки относительно её "ножки" (точки привязки).
        cursor: 'inherit' //Кастомный курсор при наведении
      });
    } else {
      // $('.balloon-top').parents('.ymaps-2-1-76-balloon__layout').addClass('balloon--custom');
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






  // function onObjectEvent2 (e) {
  //   function customBalloon() {
  //     $('.balloon-top').parents('.ymaps-2-1-76-balloon__layout').addClass('balloon--custom');
  //   }
  //   setTimeout(customBalloon, 50);
  // }
  // objectManager.objects.events.add('click', onObjectEvent2);

  // function onObjectEvent2 () {
  //   var i100 = 0;
  //   while (10000 > i100){
  //     $('.balloon-top').parents('.ymaps-2-1-76-balloon__layout').addClass('balloon--custom');
  //     console.log(i100);
  //     i100++
  //   }
  // }
  // objectManager.objects.events.add(['click'], onObjectEvent2);



                        // function onObjectEvent (e) {
                        //   var objectId = e.get('objectId');
                        //
                        //   if (e.get('type') == 'mouseenter') {
                        //     // Метод setObjectOptions позволяет задавать опции объекта "на лету".
                        //     objectManager.objects.setObjectOptions(objectId, {
                        //       iconLayout: 'default#image', // Необходимо указать данный тип макета.
                        //       iconImageHref: 'assets/img/marker-2.png', // Своё изображение иконки метки.
                        //       iconImageSize: [100, 100], // Размеры метки.
                        //       iconImageOffset: [-55, -55], // Смещение иконки относительно её "ножки" (точки привязки).
                        //       cursor: 'inherit' //Кастомный курсор при наведении
                        //     });
                        //   } else {
                        //     objectManager.objects.setObjectOptions(objectId, {
                        //       iconLayout: 'default#image', // Необходимо указать данный тип макета.
                        //       iconImageHref: 'assets/img/marker.png', // Своё изображение иконки метки.
                        //       iconImageSize: [40, 40], // Размеры метки.
                        //       iconImageOffset: [-25, -25], // Смещение иконки относительно её "ножки" (точки привязки).
                        //       cursor: 'inherit' //Кастомный курсор при наведении
                        //     });
                        //   }
                        // }
                        // objectManager.objects.events.add(['mouseenter', 'mouseleave'], onObjectEvent);

  $.ajax({
    url: "assets/js/data.json"
  }).done(function(data) {
    objectManager.add(data);
  });

}

//
// ymaps.ready(function () {
//   var map = new ymaps.Map('map', {
//     center: [55.7, 37.6],
//     zoom: 10,
//     controls: []
//   });
// // Создание метки с квадратной активной областью.
//   var squareLayout = ymaps.templateLayoutFactory.createClass('<div id="placemarkr" class="placemarkr">$</div>');
//   var squarePlacemark = new ymaps.Placemark(
//     [55.725118, 37.682145], {
//       hintContent: 'Метка'
//     }, {
//       iconLayout: squareLayout,
// // Описываем фигуру активной области "Прямоугольник".
//       iconShape: {
//         type: 'Rectangle',
// // Прямоугольник описывается в виде двух точек - верхней левой и нижней правой.
//         coordinates: [
//           [-25, -25], [25, 25]
//         ]
//       }
//     }
//   );
//   map.geoObjects.add(squarePlacemark);
//   squarePlacemark.events.add('mouseenter', function () {
//     $('#placemarkr').addClass('placemarkr-hover');
//   });
//   squarePlacemark.events.add('mouseleave', function () {
//     $('#placemarkr').removeClass('placemarkr-hover');
//   });
// });

