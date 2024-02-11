import CreateElement from '../createElement.js';

const header = new CreateElement('header', ['header']);

const title = new CreateElement('h1', ['title'], 'NONOGRAMS');
header.element.append(title.element);

const buttonWrapper = new CreateElement('div', ['button-wrapper']);
header.element.append(buttonWrapper.element);

const buttonTheme = new CreateElement('button', ['button-theme']);
buttonWrapper.element.append(buttonTheme.element);

const buttonSound = new CreateElement('button', ['button-sound']);
buttonWrapper.element.append(buttonSound.element);

export {
  header,
  buttonTheme,
  buttonSound
};