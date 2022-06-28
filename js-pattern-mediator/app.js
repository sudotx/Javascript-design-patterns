const User = function (name) {
  this.name = name;
  this.chatroom = null; //this user isn't assigned to any chatroom
};

User.prototype = {
  //declares all the new functions in User
  send: function (message, to) {
    this.chatroom.send(message, this, to);
  },
  receive: function (message, from) {
    console.log(`${from.name} to ${this.name}: ${message}`);
  },
};

const Chatroom = function () {
  //declares a chatroom instance,where the chatroom is the MEDIATOR..
  //it provides where users chat and grants privileges to them
  let users = {}; //list of users allowed in the chatroom
  //variables and functions here can be added here from the function "register" in its visible returned object.

  return {
    register: function (user) {
      //this adds new users to the users object, allowing them access the send and receive functions and changes the user.chatroom to current chatroom
      users[user.name] = user;
      user.chatroom = this;
    },
    send: function (message, from, to) {
      //this governs the send privilege of users in the chatroom
      if (to) {
        //if the "to" user is provided
        //Single User Message
        to.receive(message, from);
      } else {
        //Mass User Message
        for (key in users) {
          //the rest of the users in the users object
          if (users[key] !== from) {
            //if its not from the user itself
            users[key].receive(message, from); //send to others in the users object
          }
        }
      }
    },
  };
};

const Ryan = new User("Ryan");
const Lina = new User("Lina");
const Donald = new User("Donald");

const chatroom = new Chatroom();

chatroom.register(Ryan);
chatroom.register(Lina);
chatroom.register(Donald);

Lina.send("hello", );
