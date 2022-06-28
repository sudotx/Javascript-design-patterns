function EventObserver() {
  //this is acts as a class like structure housing its children variables and functions that can be inherited
  this.observers = []; //this houses functions that are currently active ie can be called on
}

EventObserver.prototype = {
  //this is a child of the EventObserver function
  subscribe: function (fn) {
    //this pushes new function to the observer array
    this.observers.push(fn);
    console.log(`You're now subscribed to ${fn.name}`);
  },
  unsubscribe: function (fn) {
    //this filters the array with active functions and returns only functions that aren't already in it
    this.observers = this.observers.filter((item) => {
      if (item !== fn) {
        return item; //essentially blocking the function if its already in the array  //todo stop this from being called if the observer array is empty,or log a message
      }
    });
    console.log(`You're now unsubscribed from ${fn.name}`);
  },
  fire: function (fn) {
    //loops through all active functions and calls them
    this.observers.forEach((item) => {
      item.call();
    });
  },
};

const click = new EventObserver(); //creates an instance of EventObserver

//milliseconds subscribe button listener
document.querySelector(".sub-ms").addEventListener("click", function () {
  click.subscribe(getCurMilliSeconds);
});

//milliseconds unsubscribe button listener
document.querySelector(".unsub-ms").addEventListener("click", function () {
  click.unsubscribe(getCurMilliSeconds);
});

//seconds subscribe button listener
document.querySelector(".sub-s").addEventListener("click", function () {
  click.subscribe(getCurSeconds);
});

//seconds unsubscribe button listener
document.querySelector(".unsub-s").addEventListener("click", function () {
  click.unsubscribe(getCurSeconds);
});

//fire event, calls all functions in the observer array
document.querySelector(".fire").addEventListener("click", function () {
  click.fire();
});

const getCurMilliSeconds = function () {
  //function to be called by curSeconds
  console.log(`Cuurent Milliseconds: ${new Date().getMilliseconds()}`);
};

const getCurSeconds = function () {
  //function to be called by curSeconds
  console.log(`Cuurent seconds: ${new Date().getSeconds()}`);
};
