const imported = require("./inventory.ES6.js");
const { v4 : uuidv4} = require('uuid');

function makeOptions(inv, prop) {
  return Object.keys(inv)
          .filter(name => inv[name][prop])
          .map(name => '<option value="' + name + '"> ' + name + ", " +inv[name]['price'] + "kr" + '</option>')
          .reduce((res, curr) => res + "\n" + curr, ""); //.join funkar här också
}


class Salad {
  static instanceCounter = 0;
  constructor(arg) {
    const uuid = uuidv4();
    this.uuid = uuid;
    this.id = 'salad_' + Salad.instanceCounter++;
    if (arg instanceof Salad) {
      this.ingredients = {...arg.ingredients};
      return;

    } else if (typeof arg === "string") {
      this.ingredients = JSON.parse(arg).ingredients;
      this.id = JSON.parse(arg).id;
      this.uuid = JSON.parse(arg).uuid;
      //Kopia ska ha samma id
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

Salad.prototype.getPrice = function () {
  return Object.values(this.ingredients).reduce((previous, current) => previous + current.price*(current.amount || 1), 0);
}
//Beräkna amount i GourmentSalad classen

Salad.prototype.count = function (property) {
  return Object.values(this.ingredients).filter(prop => prop[property])
                                        .reduce((previous, current) => previous + 1, 0); //reduce här kan bli .length
}

class GourmetSalad extends Salad{

  add(name, property, amount = 1) {
    let propCop = {...property};
    propCop['amount'] = (amount + this.ingredients[name]?.amount ?? 0) ;
    super.add(name, propCop);
    return this;
  }

  //Copy på gourmetsalad kommer konflikta på amount

}
export default Salad;