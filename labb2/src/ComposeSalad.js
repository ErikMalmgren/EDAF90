import { useState } from 'react';

function ComposeSalad(props) {
  let extras = Object.keys(props.inventory).filter(name => props.inventory[name].foundation);
  const [foundation, setFoundation] = useState('Pasta'); 
  const [extra, setExtra] = useState({Bacon: true, Fetaost: true}); 

  return (
    <div className="container col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Välj bas</h2>
          <select key ={foundation} onChange={e => setFoundation(e.target.value)}>
            {extras.map(name => <option key={name} value={name}
            >{name}</option>)}
          {/* {extras.map(name => <div key={name} className="col-4">{name}</div>)} */}
          </select>
      </div>
    </div>
  );
}
export default ComposeSalad;