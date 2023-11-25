// плавный скролл
let burgerMenu = document.querySelector('.header__container-3');

function smoothScroll(my_class) {
  document.querySelectorAll(my_class).forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      let href = '';
      if(my_class !== '.catalog__link') {
        href = this.getAttribute('href').substring(1);
      }
      else {
        href = this.getAttribute('data-painter');
      };
      const scrollTarget = document.getElementById(href);
      const elementPosition = scrollTarget.getBoundingClientRect().top;

      window.scrollBy({
          top: elementPosition,
          behavior: 'smooth',
      });
      burgerMenu.classList.remove('burger-menu--active');
      burger.classList.remove('burger--active');
      body.style.overflow='auto';
    });
  });
};

// header

// открытие бургер меню
let burger = document.querySelector('.burger');
let body = document.querySelector('body');
// let burgerClose = document.querySelector('.burger-menu__close');
// let headerLogo = document.querySelector('.header__logo');


burger.addEventListener('click', function() {
  if(!document.querySelector('.burger-menu--active')) {
    burger.classList.add('burger--active');
    burgerMenu.classList.add('burger-menu--active');
    body.classList.add('overflow');
  }
  else {
    burger.classList.remove('burger--active');
    burgerMenu.classList.remove('burger-menu--active');
    body.classList.remove('overflow');
  };
});

if (document.innerWidth > 1024) {
  burgerMenu.remove('burger-menu--active');
}

// открытие/скрытие поисковой строки в header на разных разрешениях экрана
let headerSearch = document.querySelector('.header__search');
let searchContainer = document.querySelector('.header__search-container');
let searchClose = document.querySelector('.search--close');

headerSearch.addEventListener('click', function() {
  if (window.innerWidth <= 768) {
    burger.style.display='none';
    headerLogo.style.display='none';
    headerSearch.classList.remove('header__search--active')
  };
  searchContainer.classList.add('header__search-container--active');
  headerSearch.classList.remove('header__search--active');
});

searchClose.addEventListener('click', function() {
  if (window.innerWidth <= 768) {
    burger.style.display='block';
    headerLogo.style.display='flex';
  };
  searchContainer.classList.remove('header__search-container--active');
  headerSearch.classList.add('header__search--active');

});


// открытие выпадающего списка
const dropdownAll = document.querySelectorAll('.dropdown')

// перебираем все блоки с названием стиля рисунка
dropdownAll.forEach(function(el) {

  // отлавливаем клик по блоку, после
  el.addEventListener('click', function(click_el) {
    // снова перебираем все блоки с названиями стилей
    dropdownAll.forEach(function(other_el) {

      // находим блок по которому кликнули
      if (other_el == click_el.currentTarget) {

        // если у блока, по которому кликнули уже открыт выпадающий список, тогда
        if (click_el.currentTarget.querySelector('.dropdown__arrow--open')) {
          // удаляем у него два класса, которые делают видимым выпадающий список и переворачивает стрелку
          click_el.currentTarget.querySelector('.dropdown__arrow').classList.remove('dropdown__arrow--open');
          click_el.currentTarget.querySelector('.dropdown__container').classList.remove('dropdown__container--open');
        }

        // если у блока, по которому кликнули выпадающий список не открыт, тогда
        else {
          // добавляем нужным блокам требуемые классы, после чего выпадающий список отобразится
          click_el.currentTarget.querySelector('.dropdown__arrow').classList.add('dropdown__arrow--open');
          click_el.currentTarget.querySelector('.dropdown__container').classList.add('dropdown__container--open');
        };
      }
      // если по блоку с названием стиля картины клика не было, а был клик по другому блоку, тогда
      // скрываем выпадающий список (если он открыт) путём удаления классов отвечающих за отображения списка и поворот стрелки
      else {
          other_el.querySelector('.dropdown__arrow').classList.remove('dropdown__arrow--open');
          other_el.querySelector('.dropdown__container').classList.remove('dropdown__container--open');
      };
    });
  });

  // для открытия выпадающего списка с клавиатуры, отлавливаем нажатие пробела на блоке с названием стиля картины
  el.addEventListener('keydown', function(click_el) {
    if (click_el.keyCode == 32) {
      el.querySelector('.dropdown__arrow').classList.toggle('dropdown__arrow--open');
      el.querySelector('.dropdown__container').classList.toggle('dropdown__container--open');
    };
  });
});

// скрытие выпадающего списка с именами художников при клике вне списка
document.onclick = function(doc) {
  if (doc.target.classList.value != document.querySelector('.dropdown__selected').classList.value) {
    dropdownAll.forEach(function(el) {
      el.querySelector('.dropdown__arrow').classList.remove('dropdown__arrow--open');
      el.querySelector('.dropdown__container').classList.remove('dropdown__container--open');
    });
  };
};

const swiper = new Swiper('.swiper', {
  speed: 8000,
  a11y: {
    enabled: true,
    prevSlideMessage: 'Предыдущий слайд',
    nextSlideMessage: 'Следующий слайд',
    firstSlideMessage: 'Первый слайд',
    firstSlideMessage: 'Последний слайд',
    paginationBulletMessage: 'Перейти к слайду {{index}}',
    slideLabelMessage: '{{index}} из {{slidesLength}} изображений',
  },
});

// hero

// настройка свайпера блока hero
const heroSwiper = new Swiper('.hero__swiper', {
  effect: "fade",
  allowTouchMove: false,
  loop: true,      // зацикливание
  speed: 10000,     // плавность перемещения
  autoplay: {       // настройки автозамены изображения
    delay: 10000,    // время статичности изображения
  },
  sourceMappingURL: 'bootstrap.min.css.map',
});

//отладка select в секции gallery
const element = document.querySelector('.gallery__select');
const choices = new Choices(element, {
  searchEnabled: false,
  itemSelectText: '',
  allowHTML: true,
  position: 'bottom',
  shouldSortItems: false,
});


// настройка слайдера блока gallery
const gallerySwiper = new Swiper('.gallery__swiper', {
  speed: 800,
  // centeredSlidesBounds: true,
  navigation: {
    nextEl: '.gallery__button-next',
    prevEl: '.gallery__button-prev',
  },
  pagination: {
    el: '.gallery__pagination',
    type: 'fraction',
  },
  a11y: {
    containerRoleDescriptionMessage: 'Изображения картин',
  },
  breakpoints: {
    slidesPerView: 1,
  480: {
    slidesPerView: 2,
    spaceBetween: 34,
    slidesPerGroup: 2,
  },
  1366: {
    centeredSlides: false,
    slidesPerView: 3,
    spaceBetween: 25,
    slidesPerGroup: 3,
  },
  1660: {

  // centeredSlides: true,
  slidesPerView: 3,
  spaceBetween: 50,
  slidesPerGroup: 3,
  }},
});

//модульное окно блока gallery
let btnPainting = document.querySelectorAll('.gallery__swiper-link');
let modalsWindows = document.querySelectorAll('.gallery__modal');
let modalWindowActive = document.querySelector('.gallery__modal--active');
let madalClosedBtn = document.querySelectorAll('.gallery__modal-btn');

// открытие модульного окна
btnPainting.forEach(function(el) {
    //отлавливаем клик по картине
  el.addEventListener('click', function(el_click) {
    // устанавливаем флаг для отслеживания, факта нахождения окна
    let flag = false;
    // после клика по картине, начинаем перебирать модальные окна в поиске совпадения
    modalsWindows.forEach(function(modal) {
      // если мы находим совпадение, тогда
      if (modal.getAttribute('data-target') == el_click.target.dataset.target) {
        // добавляем визуализирующий класс к модульному окну
        modal.classList.add('gallery__modal--active');
        // поднимаем флаг - окно найдено
        flag = true;
      }
      else {
        modal.classList.remove('gallery__modal--active');
      };
    });
    if (!flag) {
      emptyCatalog.classList.add('gallery__modal--active');
    };
  });
});

// скрытие модaльного окна в блоке gallery при клике на крестик
madalClosedBtn.forEach(function(el) {
  el.addEventListener('click', function(el_click) {
    el_click.currentTarget.parentElement.parentElement.classList.remove('gallery__modal--active');
  });
});

// настройка аккордиона в секции catalog
new Accordion('.accordion-container', {
  duration: 400,
  showMultiple: true,
});

// добавление и удаление карточки художника
let catalogLink = document.querySelectorAll('.catalog__link');
let emptyCatalog = document.querySelector('.empty-card')
let catalogAartistCard = document.querySelectorAll('.catalog__artist-card');

// перебираем имена художников
catalogLink.forEach(function(el) {
  // отлавливаем клик по имени
  el.addEventListener('click', function(el_click) {
    // устанавливаем флаг для отслеживания, факта нахождения информации
    let flag = false;
    // после клика на имя художника начинаем перебирать список карт и смотрим, есть ли карта данного художника
    catalogAartistCard.forEach(function(card) {
      // если мы находим совпадение, тогда
      if (card.getAttribute('data-target') == el_click.target.dataset.target) {
        // удаляем класс, который делает видимым карточку без художника
        emptyCatalog.classList.remove('catalog__artist-card-active');
        // добавляем визуализирующий класс к карточке художника
        card.classList.add('catalog__artist-card-active');
        // поднимаем флаг - карточка найдена
        flag = true;
      }
      // если карточка не относится к имени по которому кликнули, тогда удаляем у неё визуализирующий класс
      // (если он у неё есть), это сделано  для того, чтобы скрыть карточку художника, которая была открыта ранее
      else {
        card.classList.remove('catalog__artist-card-active');
      };
    });
    // если флаг не был перевёрнут (нужная карточка не нашлась), значит у всех карточек удалён визуализирующий класс
    // и надо отобразить пустую карточку, добавляем её визуализирующий класс
    if (!flag) {
      emptyCatalog.classList.add('catalog__artist-card-active');
    };
  });
});

// настройка свайпера секции events
const eventsSwiper = new Swiper('.events__swiper', {
  speed: 800,
  navigation: {
    nextEl: '.events-button-next',
    prevEl: '.events-button-prev',
  },
  a11y: {
    containerRoleDescriptionMessage: 'Перечисление предстоящих событий',
  },
  pagination: {
    el: '.events__pagination',
    clickable: true,
    type: 'bullets',
  },
  breakpoints: {
    slidesPerView: 1,
    721: {
      slidesPerGroup: 2,
      slidesPerView: 2,
      spaceBetween: 38,
    },
    768: {
      slidesPerGroup: 2,
      slidesPerView: 2,
      spaceBetween: 34,
    },
    1024: {
      slidesPerGroup: 2,
      slidesPerView: 3,
      spaceBetween: 27,
    },
    1920: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  },
});


// настройка тултипов секции События
let projectsTooltips = document.querySelectorAll('.projects__tooltip-btn');

projectsTooltips.forEach(function(el) {
  tippy(el, {});
});

// настройка свайпера секции projects
const projectsSwiper = new Swiper('.projects__swiper', {
  speed: 800,
  navigation: {
    nextEl: '.projects-button-next',
    prevEl: '.projects-button-prev',
  },
  pagination: {
    clickable: true,
    el: '.projects-pagination',
    type: 'bullets',
  },
  a11y: {
    containerRoleDescriptionMessage: 'Спонсоры проектов',
  },
  slidesPerView: 1,
  breakpoints: {
    slidesPerView: 1,
    720: {
      slidesPerView: 2,
      spaceBetween: 34,
    },
    770: {
      slidesPerView: 1,
    },
    800: {
      slidesPerView: 2,
      spaceBetween: 50,
    },
    1366: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  },
});


// маска для ввода номера телефона
let tel = document.querySelector('.contacts__input-tel');
var im = new Inputmask("+7 (999) 999-99-99");
im.mask(tel);

// Насторойка валидации формы в блоке Контакты
new JustValidate('.contacts__form', {
  rules: {
    tel: {
      required: true,
      strength: {
        custom: '[0-9]{7}'
      },
      minLength : 7,
      maxLength : 7,
    },
    name: {
      required: true,
      strength: {
        custom: '[A-Z]*[a-z]*[А-Я]*[а-я]*'
      },
      minLength : 2,
      maxLength : 30,
    },
  },
  messages: {
    tel: {
      required: 'Ввведите номер телефона',
      strength: 'Введите цифры',
      minLength: 'Введите 7 цифр телефона',
      maxLength: 'Введите 7 цифр телефона',
    },
    name: {
      required: 'Ввведите имя',
      strength: 'Введены недопустимые символы',
      minLength: 'Введите более 2 букв',
      maxLength: 'Введите менее 30 символов',
    },
  colorWrong: '#D11616',
  // submitHandler: function(thisForm) {
  //   let formData = new FormData(thisForm);

  //   let xhr = new XMLHttpRequest();

  //   xhr.onreadystatechange = function () {
  //     if (xhr.readyState === 4) {
  //       if (xhr.status === 200) {
  //         console.log('Отправлено');
  //       }
  //     }
  //   }

  //   xhr.open('POST', 'mail.php', true);
  //   xhr.send(formData);

  //   thisForm.reset();
  // }
}});


//map
ymaps.ready(init);
function init(){
  var myMap = new ymaps.Map("map", {
    center: [55.760800, 37.616149],   //выставляем центр
    zoom: 14,                         //задаём зум карте
    controls: [],                     //удаляем все кнопки с карты
    behaviors: ['drag'],              //отключаем зум скролом
    });

  var myPlacemark = new ymaps.Placemark([55.760800, 37.616149], {}, {
    iconLayout: 'default#image',
    iconImageHref: './img/point.svg',
    iconImageSize: [20, 20],
  });

  var myZoomControl = new ymaps.control.ZoomControl({
    options: {
      size: "small",
      position: {right: 20, top: 250}
    },
  });

  var myGeolocationControl = new ymaps.control.GeolocationControl({
    options: {
      position: {right: 20, top: 350},
    },
  });
  myMap.geoObjects.add(myPlacemark);
  const mediaQueryMin1024 = window.matchMedia('(min-width: 1024px)')
  function handleTabletChanges(e) {
    if (e.matches) {
      myMap.controls.add(myZoomControl);
      myMap.controls.add(myGeolocationControl);
    };
  };
  mediaQueryMin1024.addListener(handleTabletChanges);
  handleTabletChange(mediaQueryMin1024);

  const mediaQueryMax1024 = window.matchMedia('(max-width: 1024px)')
  function handleTabletChange(e) {
    if (e.matches) {
      myMap.controls.remove(myZoomControl);
      myMap.controls.remove(myGeolocationControl);
    };
  };
  mediaQueryMax1024.addListener(handleTabletChange);
  handleTabletChange(mediaQueryMax1024);
};

// Плавный скрол
smoothScroll('.nav__link');
smoothScroll('.hero__btn');
smoothScroll('.catalog__link-gallery');

let linkPainter = document.querySelectorAll('.catalog__link');
linkPainter.forEach(function(el) {
  el.addEventListener('click', function() {
    if (window.innerWidth <= 640) {
      smoothScroll('.catalog__link');
    };
  });
});
