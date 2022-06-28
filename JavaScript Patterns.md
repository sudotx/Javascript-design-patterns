---
title: JavaScript Patterns
created: '2022-03-11T14:55:33.571Z'
modified: '2022-03-18T11:11:25.373Z'
---

# JavaScript Patterns

A reusable solution that can be used to solve occuring problems in software design is known, also known as template used to solve problems ie a way to create a specific pattern of writing code

__Situations vary the pattern used__

For example, 
> factory and prototype patterns are used for object creation..

> Module pattern and its variations are used for overall 

> MVC(model view controller) pattern --is a complete software design pattern

* Module , Revealing Module Pattern - used for overall structure, it allows to break up code into modules so it can have private functions and variables
* Singleton - only one instance of an object can be created
* Factory - used to create many objects
* Observer - makes it possible to subscribe and unsubscribe to events
* Mediator - has a central mediator and has colleagues, that seperate off from it
* State - allows to have a certain state in the application which can be changed

## Module Pattern && Revealing Module Pattern

Modules allow seperate files to export custom pieces of code and import them to be used in the context of a new file

Its not yet supported in browsers a transpiler like babel, and a module loader like webpack(bundles the files so the browser undertands) has to be employed to translate es6 to es5 syntax that the browser unsertands

```js
// Basic structure of module patterns

(function(){
  // Declare private variables and functions here

  return {
    //Declare Public Variables and functions here, this can refer to the private variables and functions, and can also be called from outside the IIFE
  }
})()      // Immedeatly Invoked Function Expression (is a function thats called right away) it allows for private scopes, a closure that protects variables and methods and **returns an object** instead of a function


const UICtrl = (function(){
  let text = "Hello World"

  const changeText = function(){
    const element = document.querySelector("h1")
    element.textContent = text
  }

  return {
    callChangeText : function(){
      changeText()
      console.log(text)
    }
  }
})()
UICtrl.callChangeText()   // calls callChange text(which is a public function, but it can call the private function(*change text()*) and can refer to the private variable(text))
```

## Revealing module method

The main purpose here is to maintain "Encapsulation" and reveal certain variables and methods returned in an object literal. For Example

```js
const ItemCtrl = (function(){
  let _data = [] //initialize private array for storage
  function add(item){ //function to add item to the data array
    _data.push(item)
    console.log("Item")   //logs message to console
  }
  function getID(id){   //gets item with given id and returns it
    return _data.find((item) => {
      return item.id == id
    })
  }
  return {    //reveals certain private variables and functions here, to be called outside IIFE expression
    add: add,
    getID: getID
  }
})()
```
## Singleton Pattern

This pattern allows for a single instance to be created but as many instances of the same object. it resricts creation of multiple objects,  after the first object has been created.after that it returns instances of itself --> for example, for some resourse thats shared across multiple users but is only one item, its then instantised whenever needed.eg, ten computers sharing one printer.

```js
const Singleton = (function () {
  let instance;     // this allows only one instance of the function to exist

  function createInstance(item) {   //this function is declared,and is private
    const object = new Object(item);
    return object;
  }

  return {      // this is the public part of the module, the singly instanced function is refered from private
    getInstance: function (item) {
      if (!instance) {      //if item passed in isnt an instance already, create a new instance ...
        instance = createInstance(item);
      }
      return instance;    //else return the instance already created
    }
  };
})();

instanceA = Singleton.getInstance({ name: "Walter" }); //create new instance
instanceB = Singleton.getInstance({ name: "Barry" });  //create new instance
instanceC = Singleton.getInstance({ name: "Barry" });

console.log(instanceA === instanceC)  //this returns true, because they are both same to the machine
console.log(instanceB === instanceC)  //this also returns true, because they are both same to the machine

```

## Factory Method 

This is used to create objects, but subclasses can be used to manage which classes to instantiate, they are often used in applications to manage,maintain and manipulate collections of objects that are different but share common characteristics. _For example, for a club membership system where members can be of different types but still have similar properties and methods_
 For Example,
```js
function MemberFactory() {      
  this.createMember = function (name, type) {
    //this creates an instance or member with a name and type defined
    let member;

    //depending on type defined, each new member is passed through a function to assign appropriate cost to the type defined
    if (type === "simple") {
      member = new SimpleMembership(name);
    } else if (type === "standard") {
      member = new StandardMembership(name);
    } else if (type === "super") {
      member = new SuperMembership(name);
    }

    member.type = type;//attaches type passed to the member

    member.define = function () {
      //attaches to each instance of a member
      console.log(`${this.name}(${this.type}): ${this.cost}`);
    };
    return member;
  };
}

//sets an appropriate price to the member instance depending on type its defined with
const SimpleMembership = function (name) {
  this.name = name;
  this.cost = "$5";
};
const StandardMembership = function (name) {
  this.name = name;
  this.cost = "$15";
};
const SuperMembership = function (name) {
  this.name = name;
  this.cost = "$25";
};

const members = [];//to group members 
const factory = new MemberFactory();//creates new instance of MemberFactory

//create new members
members.push(factory.createMember("Margaret Carter", "super"));
members.push(factory.createMember("Ronnie Hoffman", "super"));
members.push(factory.createMember("Jesus Cummings", "simple"));
members.push(factory.createMember("Josephine Jacobs", "standard"));

members.forEach((member) => {
  member.define();
});
```
## Observer Pattern
in this pattern, an event can be triggered to notify dependent objects that a change has occured. it consists of a subject, obserever and concrete object
* subject object - contains references to concrete observers to notify for any changes.
* observer object - is ab abstract class that allows for the concrete observers to implement a  *notify method*--an implementation of it is the publish/subscribe pattern which uses a topic/event channel(system) between the objects receiving notification(subscribers) and the objects firing the events(publishers).This allows code to define application-specific events that can pass custom arguments with values to the subscriber--to avoid dependency between subscriber and publisher.

> _check js-patterns-observer_

## Mediator Pattern 

this creates a "mediator" between communicating ("colleages"/"mediated objects")
example of this is a chatroom.

A user method is defined with the send and recieve priviledges, and can be inherited by a number of new users.

```js
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

```

In this example, the mediator is the Chatroom function, its in charge of adding new users to the chatroom and granting priveledges, it is such that a user that isnt registered with the chatroom is not able to send messages.

The Chatroom does this by adding new users to its out of scope variable when the register function is called. And only users in there can access the other functions in the returned object, like send and receive.

```js
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

```
In a case where a user wants to send a message without a destination user to recieve the message, it checks if to make sure the user sending the message is excluded before looping through the rest of the users in the users object and send the same message recursively to each of them.
```js
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

```
## State pattern
WIP--code @ _js-patterns-project_




































