import cards from './matrix.json' with { type: 'json' };
import { timerInner, clearTimer, resetTimer, setTimer } from './timer/timer.js';

class Game {
  constructor() {
    this.card = null;
    this.matrix = null;
    this.level = 'basic';
    this.name = 'flower';
    this.isTimer = false;
    this.isSolution = false;
    this.matrixState = null;
  }

  setLevel(level) {
    this.level = level;
  }

  setName(name) {
    this.name = name;
  }

  setMatrixState() {
    let arrayWithZero = [];
    for (let i = 0; i < this.matrix.length; i++) {
      arrayWithZero[i] = [];
      for (let j = 0; j < this.matrix.length; j++) {
        arrayWithZero[i][j] = 0;
      }
    }
    return arrayWithZero;
  }

  setRandomCard() {
    const random = cards[Math.floor(Math.random() * cards.length)];
    this.level = random.level;
    this.name = random.name;
  }

  getCard() {
    const conditions = {};
    if (this.level) conditions.level = this.level;
    if (this.name) conditions.name = this.name;
    this.card = cards.filter(item => {
      return Object.keys(conditions).every(key => {
        return conditions[key] === item[key];
      });
    });
    this.card = this.card[0];
    this.getCurrentMatrix();
    this.isSolution = false;
    return this.card;
  }

  getCards(level = 'basic', name) {
    const conditions = {};
    if (level) conditions.level = level;
    if (name) conditions.name = name;

    return cards.filter(item => {
      return Object.keys(conditions).every(key => {
        return conditions[key] === item[key];
      });
    });
  }

  getLeftLines() {
    let result = {};
    for (let i = 0; i < this.matrix.length; i++) {
      let count = 0;
      let array = [];
      for (let j = 0; j < this.matrix.length; j++) {
        if (this.matrix[i][j] === 1) {
          count++;
          if (j === this.matrix.length - 1) {
            array.push(count);
          }
        } else if (count > 0) {
          array.push(count);
          count = 0;
        }
      }
      result[i] = array;
    }
    return result;
  }

  getTopLines() {
    let result = {};
    for (let i = 0; i < this.matrix[0].length; i++) {
      let count = 0;
      let array = [];
      for (let j = 0; j < this.matrix.length; j++) {
        if (this.matrix[j][i] === 1) {
          count++;
          if (j === this.matrix.length - 1) {
            array.push(count);
          }
        } else if (count > 0) {
          array.push(count);
          count = 0;
        }
      }
      result[i] = array;
    }
    return result;
  }

  getCurrentMatrix() {
    this.matrix = this.card.matrix;
    this.matrixState = this.setMatrixState();
  }

  pushMatrixState(event) {
    const array = event.target.getAttribute('id').split('_');
    const row = array[0];
    const col = array[1];
    if (event.target.classList.contains('black')) {
      this.matrixState[row][col] = 1;
    } else if (event.target.classList.contains('cross')) {
      this.matrixState[row][col] = 2;
    } else this.matrixState[row][col] = 0;
  }

  getLengthMatrix() {
    return this.matrix.length;
  }

  checkSolution() {
    const oneCount = this.matrix.flat().filter(item => item === 1).length;
    const twoCount = this.matrixState.flat().filter(item => item === 1).length;
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix[0].length; j++) {
        if (this.matrix[i][j] === 1 && this.matrixState[i][j] != 1) {
          return false; // Черная клетка не заполнена в решении
        }
      }
    }
    if (oneCount === twoCount) return true;
  }

  resetGame() {
    event.preventDefault();
    const tbodyTd = document.querySelectorAll('.white');
    for (let i = 0; i < tbodyTd.length; i++) {
      tbodyTd[i].classList.remove('cross');
      tbodyTd[i].classList.remove('black');
    }
    timerInner.element.innerHTML = '00:00';
    this.matrixState = this.setMatrixState();
    clearTimer();
    resetTimer();
    this.isSolution = false;
    this.removeTimerFlag();
  }

  removeTimerFlag() {
    return (this.isTimer = false);
  }

  startTime() {
    setTimer();
  }

  stoptTime() {
    clearTimer();
    resetTimer();
  }
}

export default Game;
