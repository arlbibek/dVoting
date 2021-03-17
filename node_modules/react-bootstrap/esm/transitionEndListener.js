import css from 'dom-helpers/css';
import transitionEnd from 'dom-helpers/transitionEnd';

function parseDuration(node, property) {
  var str = css(node, property) || '';
  var mult = str.indexOf('ms') === -1 ? 1000 : 1;
  return parseFloat(str) * mult;
}

export default function transitionEndListener(element, handler) {
  var duration = parseDuration(element, 'transitionDuration');
  var delay = parseDuration(element, 'transitionDelay');
  var remove = transitionEnd(element, function (e) {
    if (e.target === element) {
      remove();
      handler(e);
    }
  }, duration + delay);
}