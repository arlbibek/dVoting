"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = transitionEndListener;

var _css = _interopRequireDefault(require("dom-helpers/css"));

var _transitionEnd = _interopRequireDefault(require("dom-helpers/transitionEnd"));

function parseDuration(node, property) {
  var str = (0, _css.default)(node, property) || '';
  var mult = str.indexOf('ms') === -1 ? 1000 : 1;
  return parseFloat(str) * mult;
}

function transitionEndListener(element, handler) {
  var duration = parseDuration(element, 'transitionDuration');
  var delay = parseDuration(element, 'transitionDelay');
  var remove = (0, _transitionEnd.default)(element, function (e) {
    if (e.target === element) {
      remove();
      handler(e);
    }
  }, duration + delay);
}

module.exports = exports["default"];