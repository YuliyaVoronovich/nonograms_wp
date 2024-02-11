import CreateElement from '../createElement.js';
import TimerComponent from './timerComponent.js';

//Timer
let timerId = null;
export const timerWrap = new CreateElement('div', ['timer-wrap']);

export const timerInner = new CreateElement('div', ['timer'], '00:00');
timerWrap.element.append(timerInner.element);

export function setTimer() {
  const timer = new TimerComponent();
  timerId = setInterval(function () {
    timerInner.element.innerHTML = timer.currentTime();
  }, 1000);
}

export function resetTimer() {
  return (timerId = null); //текущее время игры
}

export function clearTimer() {
  clearInterval(timerId);
}
