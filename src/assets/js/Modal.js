'use strict';

(function(global) {
  global.modalInstancesCount = 0;

  // --- Default Options
  let defaults = {
    'className': '',
    'maxWidth': 800,
    //'overlay': true,
    'closeOutside': true,
    'content': '',
    'keyboardClose': true,
    'beforeOpen': null,
    'afterOpen': null,
    'beforeClose': null,
    'afterClose': null
  }

  // --- Modal Constructor
  global.Modal = function() {
    // --- Modal Win Elements
    this.modalWinWrapper = null;
    this.modalWin = null;
    this.closeButton = null;
    //this.overlay = null;

    // --- Mix/Create Options
    if (arguments[0] && typeof arguments[0] === "object") {
      this.options = mixOptions(defaults, arguments[0]);
    } else {
      this.options.defauls;
    }
  }

  // --- Public Methods
  Modal.prototype.open = function() {
    if ( !this.options.content ) return;

    // before open callback
    if ( typeof this.options.beforeOpen === 'function' ) {
      this.options.beforeOpen.call(this);
    }

    // build modal win
    buildModalWin.call(this);

    // init events
    attachEvents.call(this);

    // freeze body scroll
    document.body.classList.add('is-modal-opened');

    // add opened class state
    this.modalWin.classList.add('is-modal-win-opened');
    
    // Add instance count
    global.modalInstancesCount++;

    // after open callback
    if ( typeof this.options.afterOpen === "function" ) {
      this.options.afterOpen.call(this);
    }
  }

  Modal.prototype.close = function() {
    let self = this;
    
    // before close callback
    if ( typeof this.options.beforeClose === "function" ) {
      this.options.beforeClose.call(this);
    }

    // remove opened class (start animation)
    this.modalWin.classList.remove('is-modal-win-opened');

    // remove modal win
    this.modalWin.addEventListener('animationend', function() {
      if ( global.modalInstancesCount <= 1) {
        // unfreeze body scroll
        document.body.classList.remove('is-modal-opened');
      }
      
      detachEvents.call(self);

      destroyModalWin.call(self);

      // remove overlay
      /*if (self.options.overlay) {
        removeOverlay.call(self);
      }*/

      global.modalInstancesCount--;
    });
    
    // after close callback
    if ( typeof this.options.afterClose === "function" ) {
      this.options.afterClose.call(this);
    }
  }

  // --- Private Methods
  function buildModalWin() {
    let content = this.options.content;

    // add overlay
    /*if (this.options.overlay) {
      addOverlay.call(this);
    }*/

    /* Modal Structure */
    // build structure
    this.modalWinWrapper = document.createElement('div');
    this.modalWinWrapper.className = 'modal-win';
    this.modalWin = document.createElement('div');
    this.modalWin.className = 'modal-win__main ' + this.options.className;

    // build header
    /*let header = document.createElement('div');
    header.className = "modal-win__header";
    header.innerHTML = "<h2>Заголовок окна</h2>";
    this.modalWin.appendChild(header);*/

    // build close button
    this.closeButton = document.createElement('button');
    this.closeButton.className = 'modal-win__close';
    this.closeButton.innerHTML = "<svg class='icon modal-win__close-icon' viewbox='0 0 22.88 22.88'><path d='M.324 1.909a1.14 1.14 0 0 1 0-1.587 1.14 1.14 0 0 1 1.587 0l9.523 9.539L20.973.322a1.12 1.12 0 0 1 1.571 0 1.112 1.112 0 0 1 0 1.587l-9.523 9.524 9.523 9.539a1.112 1.112 0 0 1 0 1.587 1.12 1.12 0 0 1-1.571 0l-9.539-9.539-9.523 9.539a1.14 1.14 0 0 1-1.587 0c-.429-.444-.429-1.159 0-1.587l9.523-9.539L.324 1.909z'></path></svg>";
    this.modalWin.appendChild(this.closeButton);

    // add structure
    this.modalWinWrapper.appendChild(this.modalWin);
    document.body.appendChild(this.modalWinWrapper);

    /* Modal Structure */

    /* Fill Modal Win With Content */
    // create body of modal win
    let modalWinBody = document.createElement("div");
    modalWinBody.className = "modal-win__body";

    // get and add content
    if ( typeof content === "object" ) {
      modalWinBody.appendChild(content.cloneNode(true));
    } else {
      modalWinBody.innerHTML = content;
    }

    this.modalWin.appendChild(modalWinBody);
    /* Fill Modal Win With Content */
  };

  function destroyModalWin() {
    this.modalWinWrapper.remove();
  }

  /*function addOverlay() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'overlay';
    document.body.append(this.overlay);
  }*/

  /*function removeOverlay() {
    this.overlay.remove();
  }*/

  function attachEvents() {
    this._events = {
      closeOnButton: _handleCloseButton.bind(this),
      clickOutside: _handleOutsideClickClose.bind(this),
      escapeClose: _handleEscKeyboard.bind(this)
    };
  
    // close on button click
    if (this.closeButton) {
      this.closeButton.addEventListener('click', this._events.closeOnButton);
    }
    
    // close on click outside modal win
    if ( this.options.closeOutside ) {
      this.modalWinWrapper.addEventListener('mousedown', this._events.clickOutside);
    }
    
    // close on key Esc
    if ( this.options.keyboardClose ) {
      this.modalWinWrapper.addEventListener('keydown', this._events.escapeClose);
    }
  }
  
  function detachEvents() {
    if ( this.closeButton ) {
      this.closeButton.removeEventListener('click', this._events.closeOnButton);
    }
  
    if ( this.options.closeOutside ) {
      // remove overlay click
      this.modalWinWrapper.removeEventListener('mousedown', this._events.clickOutside);
    }
    
    // close on key Esc
    if ( this.options.keyboardClose ) {
      this.modalWinWrapper.removeEventListener('keydown', this._events.escapeClose);
    }
  }
  
  function _handleCloseButton(e) {
    this.close();
  }
  
  // close outside modal win
  // .bind() returns a new function object (removeEventListener doesn't work if just private function outsideClickClose)
  function _handleOutsideClickClose(e) {
    let target = e.target.closest('.modal-win__main');
      
    if (target) return;
    this.close();
  };
  
  function _handleEscKeyboard(e) {
    if ( e.code === "Escape" ) {
      this.close();
    }
  }
  
  // --- Utilities
  function mixOptions(srcOptions, userOptions) {
    for (let option in userOptions) {
      if (srcOptions.hasOwnProperty(option) ) {
        srcOptions[option] = userOptions[option];
      }
    }

    return srcOptions;
  }
}(window));