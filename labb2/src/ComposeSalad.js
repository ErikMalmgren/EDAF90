import { useState } from 'react';

function ComposeSalad(props) {
  let foundations = Object.keys(props.inventory).filter(name => props.inventory[name].foundation);
  const [foundation, setFoundation] = useState('Pasta'); 
  
  let proteins = Object.keys(props.inventory).filter(name => props.inventory[name].protein);
  const [protein, setProtein] = useState('Kycklingfilé');
  
  let extras = Object.keys(props.inventory).filter(name => props.inventory[name].extra);
  const [extra, setExtra] = useState({Bacon: true, Fetaost: true}); 

  return (
    <div className="container col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Välj bas</h2>
          <select value ={foundation} onChange = {e => setFoundation(e.target.value)}>
            {foundations.map(name => <option key={name}  value={name}>  {name}</option>)}
          </select>
        <h2>Välj protein</h2>
          <select value ={protein} onChange = {e => setProtein(e.target.value)}>
            {proteins.map(name => <option key={name}  value={name}>  {name}</option>)}
          </select>
        <h2>Välj tillbehör</h2>
          {extras.map((item, index) => (
             <div key={index} className="col-4 p-2 fs-7">
             <input value={item} type="checkbox" />
             <span> {item}</span>
           </div>
          ))}
      </div>
    </div>
  );
}
export default ComposeSalad;
