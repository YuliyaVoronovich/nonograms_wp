import CreateElement from './createElement.js';
import { header, buttonTheme, buttonSound } from './header/header.js';
import LocalStorage from './localStorage.js';
import { tableWrap, table, card, loadTable, audio } from './table.js';
import { timerWrap, timerInner } from './timer/timer.js';
import { formWrap, radioButtonsWrap, selectElementWrap, createCheckboxButtons, createSelect } from './form/form.js';

import imgDelete from '../img/cross.png';

export const localStor = new LocalStorage();

// ========= LAYOUT
const body = document.querySelector('body');
const bodyThemeClass = localStor.getTheme().theme;
body.classList.add(bodyThemeClass);

const container = new CreateElement('div', ['container']);
body.append(container.element);
// ========= HEADER
container.element.append(header.element);

const main = new CreateElement('main', ['main']);
container.element.append(main.element);

// ========= ASIDE
const aside = new CreateElement('aside', ['aside']);
main.element.append(aside.element);

aside.element.append(timerWrap.element);
aside.element.append(formWrap.element);

const resultWrap = new CreateElement('div', ['result']);
aside.element.append(resultWrap.element);

const resultTitle = new CreateElement('h3', ['result-title'], 'RESULTS');
resultWrap.element.append(resultTitle.element);

export const ulResult = new CreateElement('ul', ['list'], '');
resultWrap.element.append(ulResult.element);

showResults();

export function showResults() {
  const results = localStor.loadResults();
  if (results) {
    for (let i = 0; i < results.length; i++) {
      const minute =
        +Math.round(results[i].time / 60) < 10
          ? `0${+Math.round(results[i].time / 60)}`
          : +Math.round(results[i].time / 60);
      const second = +results[i].time % 60 < 10 ? `0${+results[i].time % 60}` : +results[i].time % 60;

      const time = `${minute} : ${second}`;
      const li = new CreateElement('li', ['item'], `${results[i].card.name} (${results[i].card.level}) - ${time}`);
      ulResult.element.append(li.element);
    }
  }
}

const gameField = new CreateElement('div', ['game-field']);
main.element.append(gameField.element);

// ========= BUTTONS
const buttonsGame = new CreateElement('div', ['buttons-field']);
gameField.element.append(buttonsGame.element);

const buttonSolution = new CreateElement('button', ['button'], 'Solution');
buttonsGame.element.append(buttonSolution.element);

export const buttonSave = new CreateElement('button', ['button', 'button-save'], 'Save game');
buttonsGame.element.append(buttonSave.element);

const buttonContinue = new CreateElement('button', ['button', 'button-continue'], 'Continue last game');
if (!localStor.isStateLs()) {
  buttonContinue.element.classList.add('disabled');
}
buttonsGame.element.append(buttonContinue.element);

const buttonReset = new CreateElement('button', ['button'], 'Reset game');
buttonsGame.element.append(buttonReset.element);

buttonSolution.element.addEventListener('click', () => {
  card.isSolution = true;
  table.element.innerHTML = '';
  loadTable('', card.isSolution);
  buttonSave.element.classList.add('disabled');
});

buttonSave.element.addEventListener('click', () => {
  const currentTime = timerInner.element.innerHTML;
  localStor.saveState(card, currentTime);
});

buttonContinue.element.addEventListener('click', () => {
  const ls = localStor.loadState();
  card.name = ls.card.name;
  card.matrix = ls.card.matrix;
  card.matrixState = ls.card.matrixState;
  table.element.innerHTML = '';
  card.isSolution = false;
  buttonSave.element.classList.remove('disabled');
  card.setLevel(ls.card.level);
  const cardsLevel = card.getCards(ls.card.level);
  radioButtonsWrap.element.innerHTML = '';
  selectElementWrap.element.innerHTML = '';
  createCheckboxButtons();
  createSelect(cardsLevel);
  loadTable(ls.card.matrixState);
});

buttonReset.element.addEventListener('click', () => {
  card.resetGame();
  buttonSave.element.classList.remove('disabled');
});

buttonTheme.element.addEventListener('click', () => {
  body.classList.toggle('dark');
  const theme = body.classList.contains('dark') ? 'dark' : 'light';
  localStor.setTheme(theme);
});

buttonSound.element.addEventListener('click', event => {
  event.target.classList.toggle('button-sound-off');
  audio.muted = !audio.muted;
});

// ========= TABLE
export const gameWrapTable = new CreateElement('div', ['game-wrapper']);
gameField.element.append(gameWrapTable.element);

gameWrapTable.element.append(tableWrap.element);

// ========= MODAL
export const modalWrapper = new CreateElement('div', ['modal-wrapper'], '', { id: 'modal-result' });
document.querySelector('body').append(modalWrapper.element);

const modalResult = new CreateElement('div', ['modal-result-wrap', 'modal-content']);
modalWrapper.element.append(modalResult.element);

export const modalImg = new CreateElement('img', ['img-delete'], '', { src: imgDelete, alt: 'delete' });
modalResult.element.append(modalImg.element);

const modalHeading = new CreateElement('h3', ['heading'], '');
modalResult.element.append(modalHeading.element);

export const modalWorldText = new CreateElement('div', ['modal-world__text']);
modalResult.element.append(modalWorldText.element);
