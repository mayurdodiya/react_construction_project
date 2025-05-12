import React, { useState } from 'react';

const Slider = () => {
  const [value, setValue] = useState(50); // Initialize value to 50 (default)

  const handleChange = (event) => {
    setValue(event.target.value); // Update value on change
  };

  return (
    <div style={{ margin: '50px' }}>
      <h3>Slider Value: {value}</h3>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default Slider;
