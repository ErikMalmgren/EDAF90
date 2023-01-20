'use strict';
/**
 * Reflection question 1
 * JavaScript empty strings, null and undefined 
 * all evaluate to false in a boolean context.
 */

const imported = require("./inventory.js");
const { v4 : uuidv4} = require('uuid');


// console.log('inventory: ' + imported.inventory['Sallad']);

// console.log('Object.keys():')
let names = Object.keys(imported.inventory);
names
  .sort((a, b) => a.localeCompare(b, "sv", { sensitivity: 'case' }));

// console.log('\n\nfor ... in:')
// for (const name in imported.inventory) {
//  console.log(name);
// }
/**
 * Reflection question 2
 * The for...in loop is not guaranteed 
 * to iterate over the properties in any particular order.
 * The Object.keys() method returns an array of a given 
 * object's own enumerable properties.
 * Depending on enumerable properties of the object 
 * 
 * Sort is not printed since it is part of the array and
 * not the object.
 */

console.log('\n--- Assignment 1 ---------------------------------------')

function makeOptions(inv, prop) {
  return Object.keys(inv)
          .filter(name => inv[name][prop])
          .map(name => '<option value="' + name + '"> ' + name + ", " +inv[name]['price'] + "kr" + '</option>');
}

console.log(makeOptions(imported.inventory, 'foundation'));

console.log('\n--- Assignment 2 ---------------------------------------')
class Salad {
  static instanceCounter = 0;
  constructor(arg) {
    const uuid = uuidv4();
    this.uuid = uuid;
    this.id = 'salad_' + Salad.instanceCounter++;
    if (arg instanceof Salad) {
      this.ingredients = {... arg.ingredients};
      return;

    } else if (typeof arg === "string") {
      this.ingredients = JSON.parse(arg).ingredients;
      return;

    }

    this.ingredients = {};
  }
  add(name, property) {
    this.ingredients[name] = property;
    return this;
   }
  remove(name) {
    delete this.ingredients[name];
    return this;
  }
}

let myCaesarSalad = new Salad()
  .add('Sallad', imported.inventory['Sallad'])
  .add('Kycklingfilé', imported.inventory['Kycklingfilé'])
  .add('Bacon', imported.inventory['Bacon'])
  .add('Krutonger', imported.inventory['Krutonger'])
  .add('Parmesan', imported.inventory['Parmesan'])
  .add('Ceasardressing', imported.inventory['Ceasardressing'])
  .add('Gurka', imported.inventory['Gurka']);
console.log(JSON.stringify(myCaesarSalad) + '\n');
myCaesarSalad.remove('Gurka');
console.log(JSON.stringify(myCaesarSalad) + '\n');

console.log('\n--- Assignment 3 ---------------------------------------')

Salad.prototype.getPrice = function () {
  return Object.values(this.ingredients).reduce((previous, current) => previous + current.price*(current.amount || 1), 0);
}

Salad.prototype.count = function (property) {
  return Object.values(this.ingredients).filter(prop => prop[property])
                                        .reduce((previous, current) => previous + 1, 0);
}

console.log('En ceasarsallad kostar ' + myCaesarSalad.getPrice() + 'kr');
// En ceasarsallad kostar 45kr
console.log('En ceasarsallad har ' + myCaesarSalad.count('lactose') + ' ingredienser med laktos');
// En ceasarsallad har 2 ingredienser med laktos
console.log('En ceasarsallad har ' + myCaesarSalad.count('extra') + ' tillbehör');
// En ceasarsallad har 3 tillbehör


console.log('\n--- reflection question 3 ---------------------------------------')
console.log('typeof Salad: ' + typeof Salad); // function
console.log('typeof Salad.prototype: ' + typeof Salad.prototype); // object
console.log('typeof Salad.prototype.prototype: ' + typeof Salad.prototype.prototype); // undefined
console.log('typeof myCaesarSalad: ' + typeof myCaesarSalad); // object
console.log('typeof myCaesarSalad.prototype: ' + typeof myCaesarSalad.prototype); // undefined
console.log('check 1: ' + (Salad.prototype === Object.getPrototypeOf(myCaesarSalad))); // true
console.log('check 2: ' + (Object.prototype === Object.getPrototypeOf(Salad.prototype))); // true

console.log('\n--- Assignment 4 ---------------------------------------')

const objectCopy = new Salad(myCaesarSalad);
const json = JSON.stringify(myCaesarSalad);
const jsonCopy = new Salad(json);
console.log('myCeasarSalad\n' + JSON.stringify(myCaesarSalad));
console.log('copy from object\n' + JSON.stringify(objectCopy));
console.log('copy from json\n' + JSON.stringify(jsonCopy));
objectCopy.add('Gurka', imported.inventory['Gurka']);
console.log('originalet kostar ' + myCaesarSalad.getPrice() + ' kr');
console.log('med gurka kostar den ' + objectCopy.getPrice() + ' kr');

console.log('\n--- Assignment 5 ---------------------------------------')

class GourmetSalad extends Salad{
  constructor(arg) {
    super(arg)
  }

  add(name, property, amount) {
    let propCop = {...property};
    propCop['amount'] = amount;
    super.add(name, propCop);
    return this;
  }

}

let myGourmetSalad = new GourmetSalad()
  .add('Sallad', imported.inventory['Sallad'], 0.5)
  .add('Kycklingfilé', imported.inventory['Kycklingfilé'], 2)
  .add('Bacon', imported.inventory['Bacon'], 0.5)
  .add('Krutonger', imported.inventory['Krutonger'])
  .add('Parmesan', imported.inventory['Parmesan'], 2)
  .add('Ceasardressing', imported.inventory['Ceasardressing']);
console.log('Min gourmetsallad med lite bacon kostar ' + myGourmetSalad.getPrice() + ' kr');
myGourmetSalad.add('Bacon', imported.inventory['Bacon'], 1)
console.log('Med extra bacon kostar den ' + myGourmetSalad.getPrice() + ' kr');

console.log('\n--- Assignment 6 ---------------------------------------')

console.log('Min gourmetsallad har id: ' + myGourmetSalad.id);
console.log('Min gourmetsallad har uuid: ' + myGourmetSalad.uuid);


/**
 * Reflection question 4
 * The salad function
 */
/**
 * Reflection question 5
 * You can set the writable property to false, which makes the id property read only
 */
/**
 * Reflection question 6
 * # makes it private 
 */
