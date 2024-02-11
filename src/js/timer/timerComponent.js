class TimerComponent {
  constructor() {
    this.time = 1000;
    this.date = Number(new Date(0));
  }

  currentTime() {
    let currentDate = new Date();
    currentDate.setTime((this.date += this.time));

    let second = currentDate.getSeconds();
    if (second < 10) second = `0${second}`;
    let minute = currentDate.getMinutes();
    if (minute < 10) minute = `0${minute}`;
    return minute + ':' + second;
  }
}
export default TimerComponent;
