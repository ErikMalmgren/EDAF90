const imported = require("./inventory.js");
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

  getPrice() {
    return Object.values(this.ingredients).reduce((previous, current) => previous + current.price,0);
  }

  count(prop) {
    return Object.values(this.ingredients).filter((item) => item[prop]).length;
  }
  

  static parseSaladsFromStorage() {
    let myCaesarSalad = new Salad()
    .add('Sallad', imported.inventory['Sallad'])
    .add('Kycklingfilé', imported.inventory['Kycklingfilé'])
    .add('Bacon', imported.inventory['Bacon'])
    .add('Krutonger', imported.inventory['Krutonger'])
    .add('Parmesan', imported.inventory['Parmesan'])
    .add('Ceasardressing', imported.inventory['Ceasardressing'])
    .add('Gurka', imported.inventory['Gurka']); 
    window.localStorage.setItem("shoppingCart", JSON.stringify(myCaesarSalad));
    const localCart = JSON.parse(window.localStorage.getItem("shoppingCart"));
    return localCart ? localCart.map((salad) => new Salad(JSON.stringify(salad))) : [];
  }
}


class GourmetSalad extends Salad{

  add(name, property, amount = 1) {
    const propCop = {...property};
    propCop['amount'] = (amount + this.ingredients[name]?.amount ?? 0) ;
    super.add(name, propCop);
    return this;
  }

  //Copy på gourmetsalad kommer konflikta på amount

}
export default Salad;