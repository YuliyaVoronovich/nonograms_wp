class LocalStorage {
  constructor() {
    this.state = false;
    this.key = 'currentStateMatrix_yuliyavoronovich-JSFE2023Q4';
    this.resultKey = 'results_yuliyavoronovich-JSFE2023Q4';
    this.themeKey = 'theme_yuliyavoronovich-JSFE2023Q4';
  }

  saveState(card, time) {
    const currentStateCard = { card: card, time: time };
    localStorage.setItem(this.key, JSON.stringify(currentStateCard));
    document.querySelector('.button-continue').classList.remove('disabled');
  }

  saveWin(card, time) {
    const arrayTimeFromString = time.split(':');
    const seconds = +arrayTimeFromString[0] * 60 + +arrayTimeFromString[1];

    const currentStateCard = { card: card, time: seconds };
    let cardsArray = localStorage.getItem(this.resultKey) ? JSON.parse(localStorage.getItem(this.resultKey)) : [];
    if (cardsArray.length >= 5) cardsArray.shift();
    cardsArray.push(currentStateCard);
    localStorage.setItem(this.resultKey, JSON.stringify(cardsArray));
  }

  loadState() {
    const card = localStorage.getItem(this.key);
    return card ? JSON.parse(card) : [];
  }

  loadResults() {
    const card = localStorage.getItem(this.resultKey);
    return card ? JSON.parse(card).sort((a, b) => a.time - b.time) : [];
  }

  isStateLs() {
    return (this.state = localStorage.getItem(this.key) ? true : false);
  }

  setTheme(theme) {
    const themeObject = { theme: theme };
    localStorage.setItem(this.themeKey, JSON.stringify(themeObject));
  }

  getTheme() {
    const theme = localStorage.getItem(this.themeKey);
    return theme ? JSON.parse(theme) : 'light';
  }
}

export default LocalStorage;
