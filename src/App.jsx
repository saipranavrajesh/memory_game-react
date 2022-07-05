import Cards from "./components/Cards";
import  { useState } from 'react'

function App() {
  const [blur, setBlur] = useState(true);
  return (
    <div className="App">
     <h1>Memory Game</h1>
     <button className="button startButton" onClick={()=>setBlur(false)}>Start</button>
     <button className="button stopButton" onClick={()=>setBlur(true)}>reset</button>

       <Cards setBlur={setBlur} blurred={blur}/>

    </div>
  );
}

export default App;
