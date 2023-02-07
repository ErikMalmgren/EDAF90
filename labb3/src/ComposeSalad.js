import { useState } from 'react';
import inventory from './inventory.ES6.js';
import Salad from './Salad.js';
import { useNavigate, Link } from 'react-router-dom';

function ComposeSalad(props) {
  
  // använd usememo istället
  const navigate = useNavigate();
  const foundations = Object.keys(props.inventory).filter(name => props.inventory[name].foundation);
  const [foundation, setFoundation] = useState('Pasta'); 
  
  const proteins = Object.keys(props.inventory).filter(name => props.inventory[name].protein);
  const [protein, setProtein] = useState('Kycklingfilé');
  
  const extras = Object.keys(props.inventory).filter(name => props.inventory[name].extra);
  const [extra, setExtra] = useState({Bacon: true, Fetaost: true});

  const dressings = Object.keys(props.inventory).filter(name => props.inventory[name].dressing);
  const [dressing, setDressing] = useState('Ceasardressing'); 

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

    if(!event.target.checkValidity()) {
      return;
    }
    
    const extras = Object.keys(extra).filter((n) => extra[n]);
    const ingredients = [foundation, protein, ...extras, dressing];
    const salad = new Salad();

    ingredients.forEach((ingredient) => salad.add(ingredient, inventory[ingredient]));
    resetSalad();
    props.onSaladSubmit(salad);
    navigate("/view-order");
  }

  const resetSalad = function () {
    setFoundation('Pasta');
    setProtein('Kycklingfilé');
    setExtra({});
    setDressing('Ceasardressing');
  }

  return (
    <div className="container col-12">
    <form onSubmit={handleSubmit} noValidate>
    <div className="row h-200 p-5 bg-light border rounded-3">
      <h2>Välj bas</h2>
        <select value={foundation} onChange={e => setFoundation(e.target.value)} required>
          {foundations.map(name => <option key={name} value={name}>{name}</option>)}
          <option value = ""></option>
        </select>
      <h2>Välj protein</h2>
        <select value={protein} onChange={e => setProtein(e.target.value)} required>
          {proteins.map(name => <option key={name} value={name}>{name}</option>)}
          <option value = ""></option>
        </select>
      <h2>Välj tillbehör</h2>
        {extras.map((item, index) => (
           <div key={index} className="col-3 p-2 fs-6">
           <input value={item} type="checkbox" onChange={handleCheckboxChange} name={item} checked={!!extra[item]} style={{ marginRight: "5px" }} />
           <Link 
            to={`/view-ingredient/${item}`}
            style={{textDecoration: "none"}}>
            {item}
            </Link>
         </div>
        ))}
      <h2>Välj dressing</h2>
        <select value={dressing} onChange={e => setDressing(e.target.value)} required>
          {dressings.map(name => <option key={name} value={name}>{name}</option>)}
          <option value = ""></option>
        </select>
        <button type="submit" className="btn btn-primary border rounded-3">Beställ</button>
    </div>
  </form>
</div>

  );
}
export default ComposeSalad;
