import CreateElement from '../createElement.js';
import FormComponent from './formComponent.js';
import { table, card, loadTable } from '../table.js';

//Form
const formWrap = new CreateElement('div', ['form-wrap']);
const form = new CreateElement('form', ['form'], '', { name: 'cardForm' });
//Class
const formComponent = new FormComponent();
formComponent.setForm(form.element);
formWrap.element.append(form.element);

const buttonRandom = new CreateElement('button', ['button', 'button-random'], 'Random game', {
  name: 'random',
  type: 'button',
});
form.element.append(buttonRandom.element);

const radioButtonsWrap = new CreateElement('div', ['form-radio-buttons']);
form.element.append(radioButtonsWrap.element);

const selectElementWrap = new CreateElement('div', ['select-wrapper'], '');
form.element.append(selectElementWrap.element);

/*Загрузка карточек*/
let cardsLevel = card.getCards();
createCheckboxButtons();
createSelect(cardsLevel);

export function createCheckboxButtons() {
  const radioButtonWrap = new CreateElement('div', ['form-radio-btn']);
  radioButtonsWrap.element.append(radioButtonWrap.element);

  const radioButtonFirst = new CreateElement('input', ['input-radio'], '', {
    id: 'radio1',
    name: 'level',
    value: 'basic',
    type: 'radio',
    checked: 'checked',
  });
  if (card.level === 'basic') radioButtonFirst.element.checked = true;
  radioButtonWrap.element.append(radioButtonFirst.element);
  const labelButtonFirst = new CreateElement('label', ['label-radio'], '5x5', { for: 'radio1' });
  radioButtonWrap.element.append(labelButtonFirst.element);

  const radioButtonWrapTwo = new CreateElement('div', ['form-radio-btn']);
  radioButtonsWrap.element.append(radioButtonWrapTwo.element);

  const radioButtonSecond = new CreateElement('input', ['input-radio'], '', {
    id: 'radio2',
    name: 'level',
    value: 'advanced',
    type: 'radio',
  });
  if (card.level === 'advanced') radioButtonSecond.element.checked = true;
  radioButtonWrapTwo.element.append(radioButtonSecond.element);
  const labelButtonSecond = new CreateElement('label', ['label-radio'], '10x10', { for: 'radio2' });
  radioButtonWrapTwo.element.append(labelButtonSecond.element);

  const radioButtonWrapThree = new CreateElement('div', ['form-radio-btn']);
  radioButtonsWrap.element.append(radioButtonWrapThree.element);

  const radioButtonThird = new CreateElement('input', ['input-radio'], '', {
    id: 'radio3',
    name: 'level',
    value: 'hacker',
    type: 'radio',
  });
  if (card.level === 'hacker') radioButtonThird.element.checked = true;
  radioButtonWrapThree.element.append(radioButtonThird.element);
  const labelButtonThird = new CreateElement('label', ['label-radio'], '15x15', { for: 'radio3' });
  radioButtonWrapThree.element.append(labelButtonThird.element);
}

export function createSelect(cardsLevel) {
  const selectElement = new CreateElement('select', ['select'], '', { name: 'cardName' });
  selectElementWrap.element.append(selectElement.element);

  const option = new CreateElement('option', ['name-card-option', 'first-option'], 'Select card', {
    disabled: 'disabled',
    selected: 'selected',
  });
  selectElement.element.append(option.element);

  const option2 = new CreateElement('option', ['name-card-option', 'first-option'], '', { disabled: 'disabled' });
  selectElement.element.append(option2.element);

  for (let i = 0; i < cardsLevel.length; i++) {
    const option = new CreateElement('option', ['name-card-option'], cardsLevel[i].name);
    if (cardsLevel[i].name === card.name) option.element.selected = true;
    selectElement.element.append(option.element);
  }
}
/*listeners*/
radioButtonsWrap.element.addEventListener('click', () => {
  const level = formComponent.changeLevel();
  card.setLevel(level);
  cardsLevel = card.getCards(level);
  selectElementWrap.element.innerHTML = '';
  createSelect(cardsLevel);
});

selectElementWrap.element.addEventListener('change', () => {
  formComponent.changeName();
  const name = formComponent.changeName();
  card.setName(name);
  card.getCard();
  card.getCurrentMatrix();
  //new draw
  table.element.innerHTML = '';
  document.querySelector('.button-save').classList.remove('disabled');
  card.resetGame();
  loadTable();
});

buttonRandom.element.addEventListener('click', () => {
  card.setRandomCard();
  card.getCard();
  card.getCurrentMatrix();
  card.setLevel(card.level);
  cardsLevel = card.getCards(card.level);
  table.element.innerHTML = '';
  card.resetGame();
  radioButtonsWrap.element.innerHTML = '';
  selectElementWrap.element.innerHTML = '';
  createCheckboxButtons();
  createSelect(cardsLevel);
  loadTable();
});

export { formWrap, radioButtonsWrap, selectElementWrap };
