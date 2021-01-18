"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Modal = /*#__PURE__*/function () {
  function Modal(selector, props) {
    _classCallCheck(this, Modal);

    this.props = props;
    if (selector) document.querySelector(selector).addEventListener("click", this.open.bind(this));
  }

  _createClass(Modal, [{
    key: "_create",
    value: function _create() {
      var _this = this;

      var modal = document.createElement("div");
      modal.className = "modal";
      if (this.props.isBackdropClose === true) modal.dataset.close = "true";
      var container = document.createElement("div");
      container.className = "modal__container";
      if (this.props.width) container.style.width = this.props.width + "px";
      container.insertAdjacentHTML("afterbegin", "<div class=\"modal__header\">\n\t\t\t\t<span class=\"modal__title\">".concat(this.props.title, "</span>\n\t\t\t\t<button class=\"modal__close\" data-close=\"true\">&times;</button>\n\t\t\t</div>"));
      var body = document.createElement("div");
      body.className = "modal__body";
      modal.append(container);
      container.append(body);

      this._createContent(this.props.content, body);

      if (this.props.footer) {
        var footer = document.createElement("div");
        footer.className = "modal__footer";

        this._createContent(this.props.footer, footer);

        container.append(footer);
      }

      modal.onclick = function (event) {
        if (event.target.dataset.close) _this.close();
      };

      this._modal = modal;
    }
  }, {
    key: "open",
    value: function open() {
      this._create();

      var body = document.querySelector("body");
      body.append(this._modal);
      body.classList.add("hidden");
    }
  }, {
    key: "close",
    value: function close() {
      var _this2 = this;

      this._modal.classList.add("hide");

      document.querySelector("body").classList.remove("hidden");

      this._modal.addEventListener("animationend", function () {
        // this._modal.classList.remove("hide");
        _this2._modal.remove();
      }, {
        once: true
      });
    }
  }, {
    key: "_createContent",
    value: function _createContent(props, where) {
      for (var i = 0; i < (props === null || props === void 0 ? void 0 : props.length); i++) {
        var element = document.createElement(props[i].tag);

        for (var _i = 0, _Object$entries = Object.entries(props[i]); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
              key = _Object$entries$_i[0],
              value = _Object$entries$_i[1];

          if (key === "tag") {
            continue;
          } else if (key === "text") {
            element.innerHTML = value;
          } else if (key === "on") {
            element.addEventListener(value.event, value.func);
          } else {
            element.setAttribute(key, value);
          }
        }

        where.append(element);
      }
    }
  }]);

  return Modal;
}();

function fromURLtoHTML(url, where) {
  return fetch(url).then(function (response) {
    return response.json();
  }).then(function (products) {
    var cards = products.map(function (product) {
      return "\n            <div class=\"card\" data-id=\"".concat(product.id, "\">\n\t\t\t\t<div class=\"card__image\"><img src=\"./img/small/").concat(product.id, ".jpg\" alt=\"").concat(product.name, "\"></div>\n\t\t\t\t<h2 class=\"card__name\">").concat(product.name, "</h2>\n            </div>\n            ");
    });
    where.innerHTML = cards.join("");
    return products;
  });
}

var url = "https://books-f0680-default-rtdb.firebaseio.com/books.json";
var cards = document.getElementById("cards");
var productsList;
fromURLtoHTML(url, cards).then(function (products) {
  productsList = products;
});
cards.addEventListener("click", function (event) {
  var card = event.target.closest(".card");

  if (card) {
    var _productsList$filter = productsList.filter(function (item) {
      return item.id == card.dataset.id;
    }),
        _productsList$filter2 = _slicedToArray(_productsList$filter, 1),
        product = _productsList$filter2[0];

    var formatter = new Intl.NumberFormat("kk", {
      currency: "KZT"
    });
    var cardModal = new Modal(null, {
      title: product.name,
      width: 700,
      content: [{
        tag: "img",
        src: "./img/big/".concat(product.id, ".jpg")
      }, {
        tag: "span",
        text: "\u0426\u0435\u043D\u0430: ".concat(formatter.format(product.price), " &#8376;")
      }],
      footer: [{
        tag: "button",
        "class": "modal__btn",
        text: "Добавить в корзину"
      }]
    });
    cardModal.open();
  }
});
var registration = new Modal("#registration", {
  isBackdropClose: true,
  title: "Регистрация",
  content: [{
    tag: "input",
    type: "text",
    id: "name",
    name: "name",
    placeholder: "Имя"
  }, {
    tag: "input",
    type: "email",
    id: "email",
    name: "email",
    pattern: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$",
    placeholder: "Email"
  }, {
    tag: "input",
    type: "password",
    id: "password",
    name: "password",
    placeholder: "Password"
  }, {
    tag: "label",
    "for": "modal-date",
    text: "День рождения:"
  }, {
    tag: "input",
    type: "date",
    name: "date"
  }],
  footer: [{
    tag: "button",
    "class": "modal__btn",
    text: "Регистрация",
    on: {
      event: "click",
      func: function func() {
        registration.close();
      }
    }
  }, {
    tag: "button",
    "class": "modal__btn",
    text: "Уже зарегистрирован(а)",
    on: {
      event: "click",
      func: function func() {
        registration.close();
        signIn.open();
      }
    }
  }]
});
var signIn = new Modal(".sign-in", {
  isBackdropClose: true,
  title: "Вход",
  content: [{
    tag: "input",
    type: "email",
    name: "email",
    pattern: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$",
    placeholder: "Email"
  }, {
    tag: "input",
    type: "password",
    name: "password",
    placeholder: "Password"
  }, {
    tag: "p",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, voluptatibus."
  }],
  footer: [{
    tag: "button",
    "class": "modal__btn",
    text: "Sign In"
  }]
});