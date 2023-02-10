import React, { useState } from 'react';
import './App.css';
import { useConfirm } from "./components/confirm/v2/ConfirmContext";

function App() {
  const [count, setCount] = useState(0);
  const {confirm} = useConfirm();
  async function increment() {
    if (await confirm({
      title: "Voulez-vous vraiment incrémenter ? ",
      content: "Voulez-vous vraiment effecturer cette action ?"
    })) {
      setCount(c => c + 1);
    }
  }
  console.log("render")
  return (
    <div className="App" style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
      <p>Counter: {count}</p>
      <div style={{display: "flex", flexDirection: "column", gap: 8}}>
        <button onClick={increment}>Incrémenter</button>
      </div>
    </div>
  );
}

export default App;
