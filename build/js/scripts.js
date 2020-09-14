var Selector = {
  HEADER: '.js-page-header',
  HEADER_TOGGLE: '.js-header-toggle',
  POPUPS: '.js-popups',
  POPUP_ERROR: '.js-error',
  POPUP_SUCCESS: '.js-success',
  FORM: '.js-form',
  LAST_NAME: '.js-last-name',
  FIRST_NAME: '.js-first-name',
  EMAIL: '.js-email',
  ERROR_CLOSE: '.js-error-close',
  SUCCESS_CLOSE: '.js-success-close'
};

var Class = {
  NOJS: 'page-header--nojs',
  MENU_SHOW: 'page-header--open',
  POPUP_OPEN: 'popup--open'
};

// Menu

var header = document.querySelector(Selector.HEADER);
var headerToggle = header.querySelector(Selector.HEADER_TOGGLE);

(function () {
  header.classList.remove(Class.NOJS);
})();

(function () {
  if (!headerToggle) {
    return
  }

  var onToggleClick = function (evt) {
    evt.preventDefault();
    header.classList.toggle(Class.MENU_SHOW);
  }

  headerToggle.addEventListener('click', onToggleClick);
})();

// Popups

var popups = document.querySelector(Selector.POPUPS);
var popupError = popups.querySelector(Selector.POPUP_ERROR);
var popupSuccess = popups.querySelector(Selector.POPUP_SUCCESS);
var form = document.querySelector(Selector.FORM);
var lastName = form.querySelector(Selector.LAST_NAME);
var firstName = form.querySelector(Selector.FIRST_NAME);
var email = form.querySelector(Selector.EMAIL);
var errorClose = popups.querySelector(Selector.ERROR_CLOSE);
var successClose = popups.querySelector(Selector.SUCCESS_CLOSE);

(function () {
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (!lastName.value || !firstName.value || !email.value) {
      popupError.classList.toggle(Class.POPUP_OPEN)
    } else {
      popupSuccess.classList.toggle(Class.POPUP_OPEN)
    }
  });
  errorClose.addEventListener('click', function () {
    popupError.classList.remove(Class.POPUP_OPEN)
  });
  successClose.addEventListener('click', function () {
    popupSuccess.classList.remove(Class.POPUP_OPEN)
  });
})();
