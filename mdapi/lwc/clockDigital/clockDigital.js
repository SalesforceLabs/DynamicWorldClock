import { LightningElement, api, track } from "lwc";

const YESTERDAY = "Yesterday";
const TODAY = "Today";
const TOMORROW = "Tomorrow";

export default class ClockDigital extends LightningElement {
  @api inputTime;
  @track outputTime;

  connectedCallback() {
    this.checkTime();
  }

  checkTime = () => {
    this.outputTime = new Date();
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    setTimeout(this.checkTime, 250);
  };

  get timeDifference() {
    let theTime = new Date(
      new Date().toLocaleString("en-US", {
        timeZone: this.inputTime.timeZoneId
      })
    );

    let theTimeNow = new Date();
    let millisecDiff = theTime.getTime() - theTimeNow.getTime();

    let isBeforeToday =
      new Date(theTime.toDateString()) < new Date(theTimeNow.toDateString());
    let isToday = theTime.toDateString() === theTimeNow.toDateString();
    let isAfterToday =
      new Date(theTime.toDateString()) > new Date(theTimeNow.toDateString());

    let hourDiff;
    if ((millisecDiff / 3600000).toFixed() < 0) {
      hourDiff = "-" + Math.abs((millisecDiff / 3600000).toFixed());
      // eslint-disable-next-line eqeqeq
    } else if ((millisecDiff / 3600000).toFixed() == 0) {
      hourDiff = "+" + Math.abs((millisecDiff / 3600000).toFixed());
    } else if ((millisecDiff / 3600000).toFixed() > 0) {
      hourDiff = "+" + Math.abs((millisecDiff / 3600000).toFixed());
    }
    if (isBeforeToday) {
      return YESTERDAY + ", " + hourDiff + "HRS";
    } else if (isToday) {
      return TODAY + ", " + hourDiff + "HRS";
    } else if (isAfterToday) {
      return TOMORROW + ", " + hourDiff + "HRS";
    }
    return "";
  }
}