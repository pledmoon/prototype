'use strict';

document.addEventListener('DOMContentLoaded', function() {
  /* ------------ Choices Selects ------------ */
  if (document.querySelector('.js-select-default')) {
    let choices = new Choices('.js-select-default', {
      delimiter: ',',
      searchEnabled: false,
      itemSelectText: ''
    });

    if ( window.matchMedia("(max-width: 767px)").matches ) {
      let el = document.querySelector('.select-lang .choices__item--selectable');
      if (el) {
        el.innerHTML = el.dataset.value;

        document.querySelector('.select-lang .js-select-default').addEventListener('change', function(e) {
          let el = document.querySelector('.select-lang .choices__item--selectable');
          el.innerHTML = e.detail.value;
        });
      }
    }
  }

  if (document.querySelector('.js-select-autocomplete')) {
    let choicesAutocomplete = new Choices('.js-select-autocomplete', {
      delimiter: ',',
      itemSelectText: ''
    });
  }
  /* ------------ Choices Selects ------------ */

  /* ------------ Top-Header-Nav ------------ */
  let mainNav = document.querySelector('.top-header-nav__list'),
      navDropdown = document.querySelector('.top-header-nav__dropdown');

  if (mainNav) {

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

    }
    /* If dropdonw not empty */

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
    },

    autoplay: {
      delay: 6000,
      disableOnInteraction: false
    },

    speed: 2000,

    effect: 'coverflow',
    coverflowEffect: {
      rotate: 30,
      slideShadows: false,
    },
  });
  /* ------------ Main Carousel ------------ */

  /* ------------ Modal-Win ------------ */
  document.addEventListener('click', function(e) {
    let target = e.target;

    if (!target.hasAttribute('data-modal-win-trigger')) return;

    let winId = target.dataset.modalWinTrigger;

    /* If wide */
    let cls = "";
    if ( target.closest('.product__view-btn') ) {
      cls = 'modal-win__main--wide';
    }
    /* If wide */

    let instance = new Modal({
      content: document.querySelector('[data-modal-win="' + winId +'"]'),
      className: cls,
      afterOpen: function() { // carousel inside
        if ( document.querySelector('[data-modal-win="' + winId + '"]').querySelector('.swiper-container') ) {
          initProductGallery(
            document.querySelector('.is-modal-win-opened .product-main-promo__main .swiper-container'), 
            document.querySelector('.is-modal-win-opened .product-main-promo__thumbs .swiper-container'),
            winId
          );
        }
      }
    });

    instance.open();

    e.preventDefault();
  });

  /*let modalTriggers = document.querySelectorAll('[data-modal-win-trigger]');

  modalTriggers.forEach(function(item) {
    item.addEventListener('click', function(e) {
      let winId = item.dataset.modalWinTrigger;

      let cls = "";
      if ( item.closest('.product__view-btn') ) {
        cls = 'modal-win__main--wide';
      }

      let instance = new Modal({
        content: document.querySelector('[data-modal-win="' + winId +'"]'),
        className: cls,
        afterOpen: function() {
          if ( document.querySelector('[data-modal-win="' + winId + '"]').querySelector('.swiper-container') ) {
            initProductGallery(
              document.querySelector('.is-modal-win-opened .product-main-promo__main .swiper-container'), 
              document.querySelector('.is-modal-win-opened .product-main-promo__thumbs .swiper-container'),
              winId
            );
          }
        }
      });

      instance.open();

      e.preventDefault();
    });
  });*/

  /*let modalWinId;

  document.addEventListener('click', function(e) {
    let trigger = e.target.closest('[data-modal-win-trigger]');

    if ( !trigger ) return;

    modalWinId = trigger.dataset.modalWinTrigger;

    let body = document.body;

    if ( !body.classList.contains('is-modal-opened') ) {
      addOverlay();
      body.classList.add('is-modal-opened');
      body.style.paddingRight = scrollWidth() + 'px';

      document.querySelector('[data-modal-win="' + modalWinId + '"] .modal-win__main').classList.add('is-modal-win-opened');
  */
      /* Carousel Inside Modal */
      /*if (document.querySelector('[data-modal-win="' + modalWinId + '"]').querySelector('.swiper-container')) {
        initProductGallery(
          document.querySelector('[data-modal-win="' + modalWinId + '"] .product-main-promo__main .swiper-container'), 
          document.querySelector('[data-modal-win="' + modalWinId + '"] .product-main-promo__thumbs .swiper-container'),
          modalWinId
        );
      }*/
      /* Carousel Inside Modal */

  /*    setTimeout(function() {
        document.addEventListener('click', clickOutsideModalWin);
      });
    }

    e.preventDefault();
  });

  document.querySelectorAll('.modal-win__close').forEach(function(item) {
    item.addEventListener('click', function(e) {
      let target = e.target.closest('.modal-win__close');

      if ( !target ) return;

      removeOverlay();
      document.body.classList.remove('is-modal-opened');
      document.body.style.paddingRight = '';

      document.querySelector('[data-modal-win="' + modalWinId + '"] .modal-win__main').classList.remove('is-modal-win-opened');

      document.removeEventListener('click', clickOutsideModalWin);
    });
  });

  function clickOutsideModalWin(e) {
    let target = e.target.closest('.modal-win__body');

    if (target) return;

    removeOverlay();
    document.body.classList.remove('is-modal-opened');
    document.body.style.paddingRight = '';

    document.querySelector('[data-modal-win="' + modalWinId + '"]').classList.remove('is-visible');

    document.removeEventListener('click', clickOutsideModalWin);
  }
  */
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
  if ( window.matchMedia('(max-width: 767px)').matches ) {
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

    /* Close Nav Button */
    let toggleNavButton = document.querySelector('.main-nav__close-nav')

    if (toggleNavButton) {
      toggleNavButton.addEventListener('click', function() {
        document.body.classList.remove('is-navbar-opened');
        document.body.style.paddingRight = '';
        removeOverlay();
        document.removeEventListener('click', clickOutsideNavbar);
      });
    }
    /* Close Nav Button */

    /* Toggles Inside */
    // create toggles
    //let navbarLinks = document.querySelectorAll('.main-nav__container a');
    let navbarLinks = document.querySelectorAll('.main-nav__container .icon');

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
  }
  /* ------------ Main-Nav ------------ */

  /* ------------ Counter ------------ */
  document.addEventListener('click', function(e) {
    let targetAdd = e.target.closest('.counter--add'),
        targetRemove = e.target.closest('.counter--remove');

    if ( !(targetAdd || targetRemove) ) return;

    // Target ADD
    if (targetAdd) {
      let input = targetAdd.closest('.counter').querySelector('input[type="tel"]');
      let value = input.value;

      if ( !parseInt(value) === value ) return;

      input.value = parseInt(value) + 1;
    }

    // Target REMOVE
    if (targetRemove) {
      let input = targetRemove.closest('.counter').querySelector('input[type="tel"]');
      let value = input.value;

      if ( !parseInt(value) === value ) return;

      if (value > 1) {
        input.value = parseInt(value) - 1;
      }
    }
  });

  /*document.querySelectorAll('.counter--add').forEach(function(item) {

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

  });*/
  /* ------------ Counter ------------ */

  /* ------------ Items Carousels ------------ */
  /*
  let loopInstanceOne = false;
  let loopInstanceTwo = false;

  if ( document.querySelectorAll('.js-instance-1 .swiper-slide').length > 4 ) {
    loopInstanceOne = true
  } else {
    if ( document.querySelector('.js-instance-1') ) {
      document.querySelector('.js-instance-1').classList.add('disabled');
    }
  }

  if ( document.querySelectorAll('.js-instance-2 .swiper-slide').length > 4 ) {
    loopInstanceTwo = true
  } else {
    if ( document.querySelector('.js-instance-2') ) {
      document.querySelector('.js-instance-2').classList.add('disabled');
    }
  }

  let opts1 = {
    loop: loopInstanceOne,
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
      768: {
        slidesPerView: 3
      },
      992: {
        slidesPerView: 3
      },
      1200: {
        slidesPerView: 4
      }
    }
  };

  let opts2 = {
    loop: loopInstanceTwo,
    slidesPerView: 1,
    // spaceBetween: 10,

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
  */

  let instancesOne = [];

  document.querySelectorAll('.js-instance-1').forEach(function(instance) {
    let loopInstance = false;
    let prev = instance.parentNode.querySelector('.default-carousel-prev');
    let next = instance.parentNode.querySelector('.default-carousel-next');
    let space = 10;

    if ( instance.parentNode.classList.contains('items-carousel-wrap--no-gutter') ) {
      space = 0;
    }

    if ( instance.querySelectorAll('.swiper-slide').length > 4 ) {
      loopInstance = true
    } else {
      instance.classList.add('disabled');
    }

    let opts = {
      loop: loopInstance,
      slidesPerView: 1,
      spaceBetween: space,

      pagination: {
        el: '.default-pagination',
        clickable: true
      },

      navigation: {
        prevEl: prev,
        nextEl: next
      },

      breakpoints: {
        340: {
          slidesPerView: 2
        },
        576: {
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

    instancesOne.push( new Swiper(instance, opts) );
  });

  let instancesTwo = [];

  document.querySelectorAll('.js-instance-2').forEach(function(instance) {
    let loopInstance = false;
    let prev = instance.parentNode.querySelector('.default-carousel-prev');
    let next = instance.parentNode.querySelector('.default-carousel-next');
    let space = 10;

    if ( instance.parentNode.classList.contains('items-carousel-wrap--no-gutter') ) {
      space = 0;
    }

    if ( instance.querySelectorAll('.swiper-slide').length > 4 ) {
      loopInstance = true
    } else {
      instance.classList.add('disabled');
    }

    let opts = {
      loop: loopInstance,
      slidesPerView: 1,
      spaceBetween: space,

      pagination: {
        el: '.default-pagination',
        clickable: true
      },

      navigation: {
        prevEl: prev,
        nextEl: next
      },

      breakpoints: {
        340: {
          slidesPerView: 2
        },
        576: {
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

    instancesTwo.push( new Swiper(instance, opts) );
  });
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

    /* Update Carousel Inside Tabs */
    if ( root.querySelector('.tabs__tab-pane:nth-child(' + (i+1) + ')').querySelector('.items-carousel') ) {
      
      if ( instancesOne ) {
        instancesOne.forEach(carousel => {
          carousel.update();
        })
      }

      if ( instancesTwo ) {
        instancesTwo.forEach(carousel => {
          carousel.update();
        })
      }

    }

    /*if ( root.querySelector('.tabs__tab-pane:nth-child(' + (i+1) + ')').querySelector('.items-carousel') ) {
      if ( instanceTwo.length ) {
        instanceOne.update();
      }
    }*/
    /* Update Carousel Inside Tabs */
  }

  let currentHash = window.location.hash;
  let hashTab = document.querySelector('.tabs__link[href="' + currentHash + '"]');
  if (hashTab) {
    let ev = new Event('click');
    hashTab.dispatchEvent(ev);
  }

  /* Tabs Accordeon */
  document.addEventListener('click', function(e) {
    let toggle = e.target.closest('.tabs__accordeon-toggle');

    if (!toggle) return;

    let parent = toggle.closest('.tabs__tab-pane');

    if ( parent.classList.contains('is-opened') ) {

      parent.classList.remove('is-opened');

    } else {

      document.querySelectorAll('.tabs__tab-pane').forEach(function(item) {
        item.classList.remove('is-opened');
      });

      parent.classList.add('is-opened');

      /* Update Carousel Inside Tabs */
      if ( parent.querySelector('.items-carousel') ) {
        console.log('lol');

        /*if ( instanceOne.length ) {
          instanceOne[0].update();
        } else {
          instanceOne.update();
        }*/

        /*if ( instanceTwo.length ) {
          instanceTwo[0].update();
        } else {
          instanceTwo.update();
        }*/

        if ( instancesOne ) {
          instancesOne.forEach(carousel => {
            carousel.update();
          })
        }

        if ( instancesTwo ) {
          instancesTwo.forEach(carousel => {
            carousel.update();
          })
        }
        
      }
      /* Update Carousel Inside Tabs */
    }
  });
  /* Tabs Accordeon */

  /* Go To Full Params Tab */
  let toggle = document.querySelector('.product-main-info__full-params');

  if (toggle) {
    toggle.addEventListener('click', function(e) {
      let hash = this.getAttribute('href');
      console.log(hash);
      let hashTab = document.querySelector('.tabs__link[href="' + hash + '"]');

      if (hashTab) {
        let ev = new Event('click');
        hashTab.dispatchEvent(ev);
      }

      e.preventDefault();
    });
  }
  /* Go To Full Params Tab */
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
      },
      format: {
        to: function (value) {
          return Math.round(value);
        },
        from: function (value) {
          return Number(value);
        }
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
  let filterHeadings = document.querySelectorAll('.filter__title');

  filterHeadings.forEach(function(item) {
    item.addEventListener('click', function(e) {
      let parent = e.target.closest('.filter__section');

      parent.classList.toggle('is-hidden');
    });
  });

  let filterMoreToggles = document.querySelectorAll('.filter__more-options');

  filterMoreToggles.forEach(function(item) {
    item.addEventListener('click', function(e) {
      let parent = e.target.closest('.filter__section');
      let textNode = this.children[0];
      
      if ( parent.classList.contains('is-fields-on') ) {
        parent.classList.remove('is-fields-on');
        textNode.innerHTML = 'Показать все';
      } else {
        parent.classList.add('is-fields-on');
        textNode.innerHTML = 'Скрыть';
      }

      e.preventDefault();
    });
  });
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

  /* ------------ Product-Main ------------ */
  let galleryThumbs = new Swiper('.js-thumbs-list', {
    direction: 'vertical',
    slidesPerView: 5,
    spaceBetween: 5,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,

    navigation: {
        prevEl: '.product-main-promo__th-prev',
        nextEl: '.product-main-promo__th-next'
    }
  });

  let galleryMain = new Swiper('.js-promo-main', {
      spaceBetween: 10,
      // effect: 'coverflow',

      pagination: {
        el: '.product-main-promo__pagination',
        clickable: true
      },

      breakpoints: {
          768: {}
      },

      thumbs: {
          swiper: galleryThumbs
      }
  });

  lightGallery(document.querySelector('.js-promo-main'), {
    selector: ".product-main-promo__img-wrap"
  });

  /* Drift Zoom */
  if ( window.matchMedia('(min-width: 992px)').matches ) {

    let driftPaneContainer = document.querySelector(".product-main-promo__zoom-pane");
    let driftInstance = null;

    initDriftZoom(document.querySelector(".js-promo-main .swiper-slide-active img"), driftPaneContainer);

    galleryMain.on('slideChange', function() {
      setTimeout(function() {

        driftInstance.destroy();
        initDriftZoom(document.querySelector(".js-promo-main .swiper-slide-active img"), driftPaneContainer);
      
      });
    });

    function initDriftZoom(driftTriggerElement, driftPaneContainer) {
      if ( !driftTriggerElement ) return;
      
      driftInstance = new Drift(driftTriggerElement, {
        paneContainer: driftPaneContainer,
        hoverBoundingBox: true,
        zoomFactor: 4,
        inlinePane: false,
        handleTouch: false
      });
    }

  }
  /* Drift Zoom */
  /* ------------ Product-Main ------------ */

  /* ------------ Navbar 3 max-width ------------ */
  document.querySelectorAll('.main-nav__catalog-item--full-catalog').forEach(function(item) {
    let navWidthContainer = document.querySelector('.main-nav__item--catalog');

    item.addEventListener('mouseenter', function(e) {
      navWidthContainer.classList.add('active');
    });

    item.addEventListener('mouseleave', function(e) {
      navWidthContainer.classList.remove('active');
    });
  });
  /* ------------ Navbar 3 max-width ------------ */

  /* ------------ Modal Cards ------------ */
  function initProductGallery(mainContainer, thumbs, modalWinId) {
    let galleryThumbs = new Swiper(thumbs, {
      direction: 'vertical',
      slidesPerView: 5,
      spaceBetween: 5,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,

      navigation: {
          prevEl: '[data-modal-win="' + modalWinId + '"] .product-main-promo__th-prev',
          nextEl: '[data-modal-win="' + modalWinId + '"] .product-main-promo__th-next'
      }
    });

    let galleryMain = new Swiper(mainContainer, {
        spaceBetween: 10,
        // effect: 'coverflow',

        pagination: {
          el: '[data-modal-win="' + modalWinId + '"] .product-main-promo__pagination',
          clickable: true
        },

        breakpoints: {
            768: {}
        },

        thumbs: {
            swiper: galleryThumbs
        }
    });
  }
  /* ------------ Modal Cards ------------ */

  /* ------------ Mobile Search Toggle ------------ */
  let searchBarToggle = document.querySelector('.js-toggle-searchbar')

  if (searchBarToggle) {
    searchBarToggle.addEventListener('click', function(e) {
      let parent = this.closest('.header');

      parent.classList.toggle('is-searchbar-opened');

      e.preventDefault();
    });
  }
  /* ------------ Mobile Search Toggle ------------ */

  /* ------------ Sticky! ------------ */
  let stickyElement = document.querySelector('.js-sticky');

  if (stickyElement) {
    let sliderGapValue = 0;
    let sliderGap = document.querySelector('.promo-carousel--offset');
    if (sliderGap) sliderGapValue = sliderGap.offsetHeight;

    let elemPosition = stickyElement.getBoundingClientRect().top + window.pageYOffset + sliderGapValue;
    let endStickyPosition = document.querySelector('.footer').getBoundingClientRect().top + window.pageYOffset;

    checkSticky(stickyElement, elemPosition, endStickyPosition);

    window.onscroll = function() {
      checkSticky(stickyElement, elemPosition, endStickyPosition);

      isOpenedAndFixedCatalog();
    }
  }

  function checkSticky(el, elPos, endPos) {
    (window.pageYOffset < elPos || window.pageYOffset > endPos)
      ?
    el.classList.remove('is-sticky')
      :
    el.classList.add('is-sticky');
  }

  /* Opened Catalog */
  let isCatalogOpened = '';
  if ( document.querySelector('.promo-carousel') ) {
    isCatalogOpened = document.querySelector('.promo-carousel').classList.contains('promo-carousel--offset');
  }

  function isOpenedAndFixedCatalog() {
    if (!isCatalogOpened) return;

    let opened = document.querySelector('.main-nav').classList.contains('is-sticky'),
        catalog = document.querySelector('.main-nav__item--catalog');

    if (opened) {
      catalog.classList.remove('is-catalog-opened');
    } else {
      catalog.classList.add('is-catalog-opened');
    }
  }

  isOpenedAndFixedCatalog();
  /* Opened Catalog */
  /* ------------ Sticky! ------------ */

  /* ------------ Continue Trigger! ------------ */
  document.addEventListener('click', function(e) {
    let continuBtn = e.target.closest('.product-added__continue');

    if (!continuBtn) return;

    let closeBtn = continuBtn.closest('.modal-win').querySelector('.modal-win__close');
    console.log(closeBtn);
    closeBtn.click();

    e.preventDefault();
  });
  /* ------------ Continue Trigger! ------------ */

  /* ------------ Vertical Carousel ------------ */
  if ( document.querySelector('.js-vertical-carousel-1') ) {
    const verticalCarousel = new Swiper('.js-vertical-carousel-1', {
      direction: 'vertical',
      slidesPerView: 2,
      loop: true,
      spaceBetween: 5,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,

      navigation: {
          prevEl: '.vertical-carousel__th-prev-1',
          nextEl: '.vertical-carousel__th-next-1'
      }
    });
  }

  if ( document.querySelector('.js-vertical-carousel-2') ) {
    const verticalCarousel = new Swiper('.js-vertical-carousel-2', {
      direction: 'vertical',
      slidesPerView: 4,
      loop: true,
      spaceBetween: 5,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,

      navigation: {
          prevEl: '.vertical-carousel__th-prev-2',
          nextEl: '.vertical-carousel__th-next-2'
      }
    });
  }
  /* ------------ Vertical Carousel ------------ */

  /* ------------ Brands Carousel ------------ */
  document.querySelectorAll('.js-brands-carousel').forEach(function(instance) {
    let loopInstance = false;
    let prev = instance.parentNode.querySelector('.brands-carousel__prev');
    let next = instance.parentNode.querySelector('.brands-carousel__next');
    let space = 25;

    if ( instance.querySelectorAll('.swiper-slide').length > 4 ) {
      loopInstance = true
    } else {
      instance.classList.add('disabled');
    }

    let opts = {
      loop: loopInstance,
      slidesPerView: 2,
      spaceBetween: space,

      pagination: {
        el: '.brands-carousel__pagination',
        clickable: true
      },

      navigation: {
        prevEl: prev,
        nextEl: next
      },

      breakpoints: {
          480: {
            slidesPerView: 3
          },
          576: {
            slidesPerView: 4
          },
          768: {
            slidesPerView: 5
          },
          992: {
            slidesPerView: 6
          },
          //1200: {}
      }
    }

    new Swiper(instance, opts);
  });
  /* ------------ Brands Carousel ------------ */

  /* ------------ Custom Scroll ------------ */
  const customScrolls = document.querySelectorAll('.js-custom-scroll');

  if (customScrolls) {
    customScrolls.forEach(function(el) {
      new SimpleBar(el, {
        autoHide: false,
        scrollbarMinSize: 4
      });
    });
  }
  /* ------------ Custom Scroll ------------ */

  /* ------------ lGallery ------------ */
  lightGallery(document.querySelector('.gallery'), {
    selector: ".js-gallery"
  });

  lightGallery(document.querySelector('.js-video-gallery'), {
    selector: "a",
    youtubePlayerParams: {
      modestbranding: 1,
      showinfo: 0,
      rel: 0,
      controls: 1
    }
  });
  /* ------------ lGallery ------------ */

  /* ------------ Sort-By Toggle Mobile ------------ */
  const sortByToggle = document.querySelector('.js-sort-by-toggle');

  if (sortByToggle) {
    sortByToggle.addEventListener('click', function(e) {
      let body = document.body;

      if ( !body.classList.contains('is-sort-buy-opened') ) {
        addOverlay();
        body.classList.add('is-sort-buy-opened');
        body.style.paddingRight = scrollWidth() + 'px';

        setTimeout(function() {
          document.addEventListener('click', clickOutsideSortBy);
        });
      }

      e.preventDefault();
    });
  }

  const sortByClose = document.querySelector('.sort-by-window__close');

  if (sortByClose) {

    sortByClose.addEventListener('click', function(e) {
      let target = e.target.closest('.sort-by-window');

      if ( !target ) return;

      removeOverlay();
      document.body.classList.remove('is-sort-buy-opened');
      document.body.style.paddingRight = '';

      document.removeEventListener('click', clickOutsideSortBy);
    });

  }

  function clickOutsideSortBy(e) {
    let target = e.target.closest('.sort-by-window');

    if (target) return;

    removeOverlay();
    document.body.classList.remove('is-sort-buy-opened');
    document.body.style.paddingRight = '';

    document.removeEventListener('click', clickOutsideSortBy);
  }
  /* ------------ Sort-By Toggle Mobile ------------ */
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