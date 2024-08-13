import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([0]);
  const [redoStack, setRedoStack] = useState([]);

  const handleIncrement = ()=>{
    if(count < 150){
      setHistory([...history,count+1]);
      setRedoStack([]);
      setCount(count+1);
    }
  }
  const handleDecrement = ()=>{
    if(count > 0){
      setHistory([...history,count-1]);
      setRedoStack([]);
      setCount(count-1);
    }
  }

  const handleUndo = ()=>{
    if(history.length > 1){
      const prevElement = history[history.length-2];
      setRedoStack([history[history.length-1],...redoStack]);
      setHistory(history.slice(0,-1))
      setCount(prevElement)
    }
  }

  const handleRedo = ()=>{
    if(redoStack.length>0){
      const nextElement = redoStack[0];
      setRedoStack(redoStack.slice(1));
      setHistory([...history,nextElement])
      setCount(nextElement)
    }
  }

  return (
    <>
      <div className="App">
        <nav className="Navbar">
          <h1>Number Manipulation Web App</h1>
        </nav>
        <div className="App-header">
          <div className="output">
            <progress
              value={count}
              max={150}
              className="progressBar"
            ></progress>
            <p>{((count / 150) * 100).toPrecision(3)}%</p>
          </div>
          <div className="App-manipulation-controls">
          <div className="App-controls">
            <button onClick={handleIncrement}>Increment</button>
            <button onClick={handleDecrement}>Decrement</button>
          </div>
            <button onClick={handleUndo}>Undo</button>
            <button onClick={handleRedo}>Redo</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
