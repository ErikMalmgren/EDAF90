import { useState } from 'react';
import inventory from './inventory.ES6.js';
import Salad from './Salad.ES6.js';

function ComposeSalad(props) {
  let foundations = Object.keys(props.inventory).filter(name => props.inventory[name].foundation);
  const [foundation, setFoundation] = useState('Pasta'); 
  
  let proteins = Object.keys(props.inventory).filter(name => props.inventory[name].protein);
  const [protein, setProtein] = useState('Kycklingfilé');
  
  let extras = Object.keys(props.inventory).filter(name => props.inventory[name].extra);
  const [extra, setExtra] = useState({Bacon: true, Fetaost: true});

  let dressings = Object.keys(props.inventory).filter(name => props.inventory[name].dressing);
  const [dressing, setDressing] = useState('Ceasardressing'); 

  let cart = [];

  const handleCheckboxChange = event => {
    const { name, checked } = event.target;
    setExtra(oldState => {
      const newState = { ...oldState };
      newState[name] = checked;
      return newState;
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    let extras = Object.keys(extra).filter((n) => extra[n]);
    let ingredients = [foundation, protein, ...extras, dressing];
    let salad = new Salad();

    ingredients.forEach((ingredient) => salad.add(ingredient, inventory[ingredient]));
    cart.push(salad);
  }

  return (
    <div className="container col-12">
    <form onSubmit={handleSubmit}>
    <div className="row h-200 p-5 bg-light border rounded-3">
      <h2>Välj bas</h2>
        <select value={foundation} onChange={e => setFoundation(e.target.value)}>
          {foundations.map(name => <option key={name} value={name}>{name}</option>)}
        </select>
      <h2>Välj protein</h2>
        <select value={protein} onChange={e => setProtein(e.target.value)}>
          {proteins.map(name => <option key={name} value={name}>{name}</option>)}
        </select>
      <h2>Välj tillbehör</h2>
        {extras.map((item, index) => (
           <div key={index} className="col-3 p-1 fs-6">
           <input value={item} type="checkbox" onChange={handleCheckboxChange} name={item} checked={extra[item]} />
           <span> {item}</span>
         </div>
        ))}
      <h2>Välj dressing</h2>
        <select value={dressing} onChange={e => setDressing(e.target.value)}>
          {dressings.map(name => <option key={name} value={name}>{name}</option>)}
        </select>
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
</div>

  );
}
export default ComposeSalad;
