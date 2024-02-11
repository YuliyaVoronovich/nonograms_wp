import CreateElement from './createElement.js';
import Game from './game.js';
import PopUp from './popUp.js';
import { timerInner } from './timer/timer.js';
import { localStor, modalWrapper, modalWorldText, modalImg, buttonSave, ulResult, showResults } from './main.js';

import soundDraw from '../audio/draw.mp3';
import soundRemove from '../audio/remove.mp3';
import soundCross from '../audio/cross.mp3';
import soundWin from '../audio/win.mp3';

export const audio = new Audio(soundDraw);
audio.currentTime = 0;

let popUp = null;
export const card = new Game();
card.getCard();

let tableWrap = new CreateElement('div', ['table-wrap']);
const table = new CreateElement('table', ['table']);
tableWrap.element.append(table.element);

loadTable();

export function loadTable(matrixState = null, isSolution = false) {
  const thead = new CreateElement('thead');
  table.element.append(thead.element);

  const theadTr = new CreateElement('tr');
  thead.element.append(theadTr.element);

  const theadTh = new CreateElement('th', ['head']);
  theadTr.element.append(theadTh.element);

  for (let i = 0; i < card.matrix.length; i++) {
    const theadTh = new CreateElement(
      'th',
      ['line'],
      card
        .getTopLines()
        [i].map(item => `<span>${item}<br></span>`)
        .join(''),
    );
    theadTr.element.append(theadTh.element);
  }
  const tbody = new CreateElement('tbody');
  table.element.append(tbody.element);

  for (let i = 0; i < card.matrix.length; i++) {
    const tbodyTr = new CreateElement('tr');
    tbody.element.append(tbodyTr.element);

    const tbodyTd = new CreateElement(
      'th',
      ['line', 'left-line'],
      card
        .getLeftLines()
        [i].map(item => `<span>${item} </span>`)
        .join(''),
    );
    tbodyTr.element.append(tbodyTd.element);

    for (let j = 0; j < card.matrix.length; j++) {
      const tbodyTd = new CreateElement('td', ['cell', 'white'], '', { id: `${i}_${j}` });
      if ((matrixState && matrixState[i][j] === 1) || (isSolution && card.matrix[i][j] === 1)) {
        tbodyTd.element.classList.add('black');
      }
      if (matrixState && matrixState[i][j] === 2) {
        tbodyTd.element.classList.add('cross');
      }
      tbodyTr.element.append(tbodyTd.element);
    }
  }
}

table.element.addEventListener('click', event => {
  if (card.isSolution) return false;
  event.preventDefault();
  if (event.target.classList.contains('cell')) {
    if (!card.isTimer) {
      card.startTime();
      card.isTimer = true;
    }
    event.target.classList.toggle('black');
    event.target.classList.remove('cross');
    card.pushMatrixState(event);
    //audio
    if (event.target.classList.contains('black')) {
      audio.src = soundDraw;
      audio.play();
    } else {
      audio.src = soundRemove;
      audio.play();
    }

    audio.play();
    if (card.checkSolution()) {
      solution();
    }
  }
});

table.element.addEventListener('contextmenu', event => {
  event.preventDefault();
  event.stopPropagation();
  if (card.isSolution) return false;
  if (event.target.classList.contains('cell')) {
    if (!card.isTimer) {
      card.startTime();
      card.isTimer = true;
    }
    event.target.classList.toggle('cross');
    event.target.classList.remove('black');
    card.pushMatrixState(event);
    //audio
    audio.src = soundCross;
    audio.play();
    if (card.checkSolution()) {
      solution();
    }
  }
});

function solution() {
  card.isSolution = true;
  // card.transformMatrix();
  const currentTime = timerInner.element.innerHTML;
  localStor.saveWin(card, currentTime);
  buttonSave.element.classList.add('disabled');
  //open popup
  const currentPopUp = modalWrapper.element;
  console.log(currentPopUp);
  popUp = new PopUp(currentPopUp);

  const array = currentTime.split(':');
  const seconds = +array[0] * 60 + +array[1];
  modalWorldText.element.textContent = `Great! You have solved the nonogram in ${seconds} seconds!`;
  popUp.openPopUp();
  card.stoptTime();
  //audio
  const audio = new Audio(soundWin);
  audio.currentTime = 0;
  audio.play();

  modalImg.element.addEventListener('click', event => {
    popUp.closePopUp(event.target.closest('.modal-wrapper'));
    event.preventDefault();
  });
  // таблица результатов
  ulResult.element.innerHTML = '';
  showResults();
}

export { tableWrap, table };
