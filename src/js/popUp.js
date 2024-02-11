class PopUp {

  constructor(popUp = '', unlock = true) {
    this.popUp = popUp;
    this.unlock = unlock;
  }
  isOpen() {
    true;
  }

  openPopUp() {
    if (this.popUp && this.unlock) {
      this.bodyLock();
      this.popUp.classList.add('open');

      this.popUp.addEventListener('click', event => {
        if (!event.target.closest('.modal-content')) {
          this.closePopUp(event.target.closest('.modal-wrapper'));
        }
      });
    }
  }

  closePopUp() {
    if (this.unlock) {
      this.popUp.classList.remove('open');
      this.bodyUnlock();
    }
  }

  bodyLock() {
    document.querySelector('body').style.paddingRight = window.textContent - document.querySelector('body').offsetWidth + 'px';
    document.querySelector('body').classList.add('body-overflow');
  }

  bodyUnlock() {
    document.querySelector('body').style.paddingRight = '0px';
    document.querySelector('body').classList.remove('body-overflow');
  }
}

export default PopUp;
