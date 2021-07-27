import React, { useState } from 'react';
import './App.css';
import CounterContainer from './Components/CounterContainer/CounterContainer';


function App() {

  const valueFromLocalStorage = Number(localStorage.getItem('value'));
  const maxValueFromLocal = Number(localStorage.getItem('maxValue'));

  const [startValue, setValue] = useState(valueFromLocalStorage ? valueFromLocalStorage : 0);
  const [visibleValue, setVisibleValue] = useState(startValue);
  const [maxValue, setMaxValue] = useState(maxValueFromLocal ? maxValueFromLocal : 5);
  const [error, setError] = useState("");

  const incrementValue = () => {
    setVisibleValue(visibleValue + 1);
  }

  const resetValue = () => setVisibleValue(startValue);

  const handleValueChange = (value: number) => {
    if (value >= maxValue) {
      setError("Start value can't be bigger or equal to Max Value")
    }

    if (error && value < maxValue) {
      setError("");
    }

    localStorage.setItem('value', String(value));
    setValue(value);
  }

  const handleMaxValueChange = (value: number) => {

    if (value <= startValue) {
      setError("Max value can't be smaller or equal to Start Value")
    }

    if (error && value > startValue) {
      setError("");
    }

    localStorage.setItem('maxValue', String(value));
    setMaxValue(value);
  }

  const [isSettingsOn, setIsSettingsOn] = useState(false);

  const toggleSettings = () => {
    setIsSettingsOn(!isSettingsOn);
  }


  return (
    <div className="App">
      <CounterContainer
        startValue={startValue}
        value={visibleValue}
        maxValue={maxValue}
        error={error}
        settings={isSettingsOn}
        incrementValue={incrementValue}
        resetValue={resetValue}
        toggleSettings={toggleSettings}
        handleValueChange={handleValueChange}
        handleMaxValueChange={handleMaxValueChange}
      />
    </div>
  );
}


export default App;
