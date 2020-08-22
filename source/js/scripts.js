var Selector = {
  HEADER: '.page__header',
  HEADER_TOGGLE: '.page-header__toggle'
};

var Class = {
  NOJS: 'page-header--nojs',
  MENU_SHOW: 'page-header--open'
};

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
