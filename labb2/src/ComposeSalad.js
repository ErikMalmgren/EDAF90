import { useState } from 'react';

function ComposeSalad(props) {
  let foundations = Object.keys(props.inventory).filter(name => props.inventory[name].foundation);
  const [foundation, setFoundation] = useState('Pasta'); 
  
  let proteins = Object.keys(props.inventory).filter(name => props.inventory[name].protein);
  const [protein, setProtein] = useState('Kycklingfilé');
  
  let extras = Object.keys(props.inventory).filter(name => props.inventory[name].extra);
  const [extra, setExtra] = useState({Bacon: true, Fetaost: true});

  let dressings = Object.keys(props.inventory).filter(name => props.inventory[name].dressing);
  const [dressing, setDressing] = useState(); 

  const handleCheckboxChange = event => {
    const { name, checked } = event.target;
    setExtra(oldState => {
      const newState = { ...oldState };
      newState[name] = checked;
      return newState;
    });
  };

  return (
    <div className="container col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <label>Välj bas
          <select value ={foundation} onChange = {e => setFoundation(e.target.value)}>
            {foundations.map(name => <option key={name}  value={name}>  {name}</option>)}
          </select>
        </label>
        <label>Välj protein
          <select value ={protein} onChange = {e => setProtein(e.target.value)}>
            {proteins.map(name => <option key={name}  value={name}>  {name}</option>)}
          </select>
        </label>
        <label>Välj tillbehör
          {extras.map((item, index) => (
             <div key={index} className="col-3 p-1 fs-6">
             <input value={item} type="checkbox" onChange= {handleCheckboxChange} name={item} checked={extra[item]} />
             <span> {item}</span>
           </div>
          ))}
        </label>
        <label>Välj dressing
          <select value ={dressing} onChange = {e => setDressing(e.target.value)}>
            {dressings.map(name => <option key={name}  value={name}>  {name}</option>)}
          </select>
        </label>
      </div>
    </div>
  );
}
export default ComposeSalad;
