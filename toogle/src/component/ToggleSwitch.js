import React, { useState } from 'react';
import './ToggleSwitch.css';

function ToggleSwitch({ id }) {
  const [isChecked, setIsChecked] = useState();

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
    console.log(`Toggle ${id} changed to:`, e.target.checked);
  };

  return (
    <div className="toggle-switch-container">
      <input
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={handleChange}
      />
      <label htmlFor={id} className="switch"></label>
      <p style={{ color: isChecked ? 'green' : 'red' }}>{isChecked ? 'ON' : 'OFF'}</p>
    </div>
  );
}

export default ToggleSwitch;
