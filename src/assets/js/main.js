'use strict';

document.addEventListener('DOMContentLoaded', function() {

  /* ------------ Choices Selects ------------ */
  let choices = new Choices('.js-select-default', {
    delimiter: ',',
    searchEnabled: false,
    itemSelectText: ''
  });

  if ( window.matchMedia("(max-width: 767px)").matches ) {
    let el = document.querySelector('.select-lang .choices__item--selectable');
    el.innerHTML = el.dataset.value;

    document.querySelector('.select-lang .js-select-default').addEventListener('change', function(e) {
      let el = document.querySelector('.select-lang .choices__item--selectable');
      el.innerHTML = e.detail.value;
    });
  }

  let choicesAutocomplete = new Choices('.js-select-autocomplete', {
    delimiter: ',',
    itemSelectText: ''
  });
  /* ------------ Choices Selects ------------ */

  /* ------------ Top-Header-Nav ------------ */
  let mainNav = document.querySelector('.top-header-nav__list'),
      navDropdown = document.querySelector('.top-header-nav__dropdown');

  window.onresize = checkItemsWidth;
  checkItemsWidth();

  function checkItemsWidth() {
    const navDropdownChildren = navDropdown.children,
          mainNavWidth = mainNav.offsetWidth,
          mainNavChlidren = mainNav.children;
    let totalWidth = 0;

    if ( window.matchMedia('(max-width: 767px)').matches ) {
      
      [...mainNavChlidren].forEach(item => {
        navDropdown.append(item);
      });

    } else {
    
      [...navDropdownChildren].forEach(item => {
        mainNav.append(item);
      });

      [...mainNavChlidren].forEach(item => {
        totalWidth += item.offsetWidth;

        if (totalWidth > mainNavWidth) {
          navDropdown.append(item);
        }
      });

    }

    /* If dropdonw not empty */
    (!!navDropdownChildren.length) 
      ? 
    mainNav.closest('nav').classList.add('has-dropdown') 
      : 
    mainNav.closest('nav').classList.remove('has-dropdown');
    /* If dropdonw not empty */
  }

  /* Events */
  document.querySelector('.js-dropdown-toggle').addEventListener('click', function(e) {
    let navbar = this.closest('.top-header-nav');

    if ( navbar.classList.contains('is-active') ) {  
      navbar.classList.remove('is-active');
      document.removeEventListener('click', clickOutside);
    } else {
      navbar.classList.add('is-active');
      document.addEventListener('click', clickOutside);
    }
  });

  function clickOutside(e) {
    let target = e.target.closest('.top-header-nav');

    if (target) return;

    document.querySelector('.top-header-nav').classList.remove('is-active');
    document.removeEventListener('click', clickOutside);
  }
  /* Events */
  /* ------------ Top-Header-Nav ------------ */

  /* ------------ Main Carousel ------------ */
  let mainCarousel = new Swiper('.js-promo-carousel', {
    loop: true,
    slidesPerView: 1,
    // spaceBetween: 10,

    pagination: {
      el: '.promo-carousel__pagination',
      clickable: true
    },

    navigation: {
      nextEl: '.promo-carousel__next',
      prevEl: '.promo-carousel__prev',
    },

    breakpoints: {
        480: {},
        576: {},
        768: {},
        992: {},
        1200: {}
    }

  });
  /* ------------ Main Carousel ------------ */

  /* ------------ Modal-Win ------------ */
  document.addEventListener('click', function(e) {
    let trigger = e.target.closest('[data-modal-win-trigger]');

    if ( !trigger ) return;

    let body = document.body;

    if ( !body.classList.contains('is-modal-opened') ) {
      addOverlay();
      body.classList.add('is-modal-opened');
      body.style.paddingRight = scrollWidth() + 'px';

      setTimeout(function() {
        document.addEventListener('click', clickOutsideModalWin);
      });
    }

    e.preventDefault();
  });

  document.querySelector('.modal-win__close').addEventListener('click', function(e) {
    let target = e.target.closest('.modal-win__close');

    if ( !target ) return;

    removeOverlay();
    document.body.classList.remove('is-modal-opened');
    document.body.style.paddingRight = '';

    document.removeEventListener('click', clickOutsideModalWin);
  });

  function clickOutsideModalWin(e) {
    let target = e.target.closest('.modal-win__body');

    if (target) return;

    removeOverlay();
    document.body.classList.remove('is-modal-opened');
    document.body.style.paddingRight = '';

    document.removeEventListener('click', clickOutsideModalWin);
  }
  /* ------------ Modal-Win ------------ */ 

  /* ------------ Footer Collapse ------------ */
  document.querySelector('.js-footer-collapse').addEventListener('click', function(e) {
    let target = e.target.closest('.footer-collapse__title');

    if (!target) return;

    target.parentNode.classList.toggle('is-toggled');
  });
  /* ------------ Footer Collapse ------------ */

  /* =============== Header-Dropdowns =============== */
  let dropdownsContainer = document.querySelector('.header-utilities');

  dropdownsContainer.querySelectorAll('.header-utility__main').forEach(function(item) {
    item.addEventListener('mouseenter', function(e) {
      this.classList.add('is-opened');
    });
  });

  dropdownsContainer.querySelectorAll('.header-utility__main').forEach(function(item) {
    item.addEventListener('mouseleave', function(e) {
      this.classList.remove('is-opened');
    });
  });

  dropdownsContainer.addEventListener('click', function(e) {
    let target = e.target.closest('.header-utility__dropdown-close');

    if (!target) return;

    target.closest('.header-utility__main').classList.remove('is-opened');
  });
  /* =============== Header-Dropdowns =============== */

  /* ------------ Main-Nav ------------ */
  document.querySelector('.main-nav-trigger').addEventListener('click', function() {
    let body = document.body;

    if ( !body.classList.contains('is-navbar-opened') ) {
      body.classList.add('is-navbar-opened');
      body.style.paddingRight = scrollWidth() + 'px';
      addOverlay();

      setTimeout(function() {
        document.addEventListener('click', clickOutsideNavbar);
      });
    }
  });

  function clickOutsideNavbar(e) {
    let target = e.target.closest('.main-nav');

    if (target) return;

    document.body.classList.remove('is-navbar-opened');
    document.body.style.paddingRight = '';
    removeOverlay();
    document.removeEventListener('click', clickOutsideNavbar);
  }

  document.querySelector('.main-nav__close-nav-wrap').addEventListener('click', function() {
    document.body.classList.remove('is-navbar-opened');
    document.body.style.paddingRight = '';
    removeOverlay();
    document.removeEventListener('click', clickOutsideNavbar);
  });

  /* Toggles Inside */
  // create toggles
  let navbarLinks = document.querySelectorAll('.main-nav__container a');

  navbarLinks.forEach(function(item) {
    if ( item.closest('li').querySelector('ul') ) {
      item.classList.add('has-dropdown');
    }
  });

  let dropdownToggles = document.querySelectorAll('.main-nav .has-dropdown');

  dropdownToggles.forEach(function(item) {
    item.addEventListener('click', function(e) {
      item.closest('li').classList.toggle('is-opened');

      e.preventDefault();
    });
  });
  /* Toggles Inside */
  /* ------------ Main-Nav ------------ */

  /* ------------ Counter ------------ */
  document.querySelectorAll('.counter--add').forEach(function(item) {

    item.addEventListener('click', function(e) {
      let input = this.closest('.counter').querySelector('input[type="tel"]');
      let value = input.value;

      if ( !parseInt(value) === value ) return;

      input.value = parseInt(value) + 1;
    });

  });

  document.querySelectorAll('.counter--remove').forEach(function(item) {

    item.addEventListener('click', function(e) {
      let input = this.closest('.counter').querySelector('input[type="tel"]');
      let value = input.value;

      if ( !parseInt(value) === value ) return;

      if (value > 1) {
        input.value = parseInt(value) - 1;
      }
    });

  });
  /* ------------ Counter ------------ */

  /* ------------ Items Carousels ------------ */
  let opts1 = {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,

    pagination: {
      el: '.default-pagination',
      clickable: true
    },

    navigation: {
      prevEl: '.sw-prev-1',
      nextEl: '.sw-next-1'
    },

    breakpoints: {
        480: {
          slidesPerView: 2
        },
        576: {
          //slidesPerView: 3
        },
        768: {
          slidesPerView: 3
        },
        992: {
          slidesPerView: 4
        },
        1200: {
          slidesPerView: 5
        }
    }
  };

  let opts2 = {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,

    pagination: {
      el: '.default-pagination',
      clickable: true
    },

    navigation: {
      prevEl: '.sw-prev-2',
      nextEl: '.sw-next-2'
    },

    breakpoints: {
        480: {
          slidesPerView: 2
        },
        576: {
          //slidesPerView: 3
        },
        768: {
          slidesPerView: 3
        },
        992: {
          slidesPerView: 4
        },
        1200: {
          slidesPerView: 5
        }
    }
  };

  let instanceOne = new Swiper('.js-instance-1', opts1);
  let instanceTwo = new Swiper('.js-instance-2', opts2);
  /* ------------ Items Carousels ------------ */

  /* ------------ Tabs ------------ */
  document.querySelectorAll('.tabs').forEach(function(item) {

    item.querySelectorAll('.tabs__link').forEach(function(item, i) {
      item.addEventListener('click', function(e) {
        let target = e.target;

        e.preventDefault();

        if ( target.classList.contains('is-active') ) return;

        let hash = target.getAttribute('href');
        if (hash != '#') {
          window.location.hash = hash;
        }

        let root = target.closest('.tabs');
        clearTabClasses(root, i);
      });
    });

  });

  function clearTabClasses(root, i) {
    root.querySelectorAll('.tabs__item').forEach(function(item) {
      item.querySelector('.tabs__link').classList.remove('is-active');
    });
    root.querySelectorAll('.tabs__tab-pane').forEach(function(item) {
      item.classList.remove('is-active');
    });
    root.querySelector('.tabs__item:nth-child(' + (i+1) + ') .tabs__link').classList.add('is-active');
    root.querySelector('.tabs__tab-pane:nth-child(' + (i+1) + ')').classList.add('is-active');
  }

  let currentHash = window.location.hash;
  let hashTab = document.querySelector('.tabs__link[href="' + currentHash + '"]');
  if (hashTab) {
    let ev = new Event('click');
    hashTab.dispatchEvent(ev);
  }
  /* ------------ Tabs ------------ */

  /* ------------ Filter ------------ */
  /* Filter-Slider */
  let priceRange = document.getElementById('price-range');
  let inputNumberA = document.getElementById('input-number-a');
  let inputNumberB = document.getElementById('input-number-b');
  let inputs = [inputNumberA, inputNumberB];

  if (priceRange) {
    noUiSlider.create(priceRange, {
      start: [1043, 1000000],
      connect: true,
      // tooltips: true,
      range: {
        'min': 0,
        'max': 1000000
      }
    });

    priceRange.noUiSlider.on('update', function(values, handle) {
      inputs[handle].value = values[handle];
    });

    inputNumberA.addEventListener('change', function() {
      priceRange.noUiSlider.set([this.value, null]);
    });

    inputNumberB.addEventListener('change', function() {
      priceRange.noUiSlider.set([null, this.value]);
    });
  }
  /* Filter-Slider */

  /* Show more */
  let filterMoreToggle = document.querySelector('.filter__more-options');

  if (filterMoreToggle) {

    filterMoreToggle.addEventListener('click', function(e) {
      document.querySelectorAll('.filter__section').forEach(function(item) {
        item.classList.remove('is-hidden');
      });

      e.preventDefault();

      setTimeout(() => {
        this.remove();
      });
    });

  }
  /* Show more */

  /* Filter-Mobile */
  let filterToggle = document.querySelector('.filter-toggle');

  if (filterToggle) {

    filterToggle.addEventListener('click', function(e) {
      let body = document.body;

      if ( !body.classList.contains('is-filter-opened') ) {
        addOverlay();
        body.classList.add('is-filter-opened');
        body.style.paddingRight = scrollWidth() + 'px';

        setTimeout(function() {
          document.addEventListener('click', clickOutsideFilter);
        });
      }

      e.preventDefault();

    });

  }

  let filterClose = document.querySelector('.filter__close');
  
  if (filterClose) {

    filterClose.addEventListener('click', function(e) {
      let target = e.target.closest('.filter');

      if ( !target ) return;

      removeOverlay();
      document.body.classList.remove('is-filter-opened');
      document.body.style.paddingRight = '';

      document.removeEventListener('click', clickOutsideFilter);
    });

  }

  function clickOutsideFilter(e) {
    let target = e.target.closest('.filter');

    if (target) return;

    removeOverlay();
    document.body.classList.remove('is-filter-opened');
    document.body.style.paddingRight = '';

    document.removeEventListener('click', clickOutsideFilter);
  }
  /* Filter-Mobile */
  /* ------------ Filter ------------ */

});

svg4everybody({});

function scrollWidth() {
  let div = document.createElement('div');
  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';
  div.style.visibility = 'hidden';
  document.body.appendChild(div);
  let scrollWidth = div.offsetWidth - div.clientWidth;
  document.body.removeChild(div);
  return scrollWidth;
}

function addOverlay() {
  let overlay = document.createElement('div');
  overlay.className = 'overlay';
  document.body.appendChild(overlay);
}

function removeOverlay() {
  let overlay = document.querySelector('.overlay')

  if (overlay) overlay.remove();
}