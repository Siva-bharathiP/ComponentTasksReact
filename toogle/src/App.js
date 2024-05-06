import React from 'react';
import './App.css';
// import ToggleSwitch from './component/ToggleSwitch';
import Dnd from './DND_Singleton/Dnd';
function App() {
  return (
    // <div className="App" style={{ display: 'flex' }}>
    //   <ToggleSwitch id="toggle1" />
    //   <ToggleSwitch id="toggle2" />
    //   <ToggleSwitch id="toggle3" />
    //   <ToggleSwitch id="toggle4" />
    //   <ToggleSwitch id="toggle5" />
    //   <ToggleSwitch id="toggle6" />
    //   <ToggleSwitch id="toggle7" />
    //   <ToggleSwitch id="toggle8" />
    //   <ToggleSwitch id="toggle9" />



    // </div>

    <div className='App'>
       <Dnd/>
    </div>
  );
}

export default App;
