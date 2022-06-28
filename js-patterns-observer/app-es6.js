class EventObserver {
  constructor() {
    this.observers = []; //this houses the active functions
  }
  subscribe(fn) {
    this.observers.push(fn); //adds to active functions
    console.log(`You're now subscribed to ${fn.name}`);
  }
  unsubscribe(fn) {
    this.observers = this.observers.filter((item) => {
      //filters out items already in observers array, essentially "deactivating" them
      if (item !== fn) {
        return item;
      }
    });
    console.log(`You're now unsubscribed from ${fn.name}`);
  }
  fire(fn) {
    //calls all active functions in observers array
    this.observers.forEach((item) => {
      item.call();
    });
  }
}

const click = new EventObserver(); //creates new instance of EventObserver class

//
document.querySelector(".sub-ms").addEventListener("click", function () {
  click.subscribe(getCurMilliSeconds);
});
document.querySelector(".unsub-ms").addEventListener("click", function () {
  click.unsubscribe(getCurMilliSeconds);
});
const getCurMilliSeconds = function () {
  console.log(`Current Milliseconds: ${new Date().getMilliseconds()}`);
};
document.querySelector(".sub-s").addEventListener("click", function () {
  click.subscribe(getCurSeconds);
});
document.querySelector(".unsub-s").addEventListener("click", function () {
  click.unsubscribe(getCurSeconds);
});

const getCurSeconds = function () {
  console.log(`Current Seconds: ${new Date().getSeconds()}`);
};
document.querySelector(".fire").addEventListener("click", function () {
  click.fire();
});
