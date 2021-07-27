import React, { useState, useEffect } from 'react';
import './App.css';
import CounterContainer from './Components/CounterContainer/CounterContainer';


function App() {

  const [startValue, setValue] = useState(0);
  const [maxValue, setMaxValue] = useState(5);

  useEffect(() => {
    const startValueFromLS = localStorage.getItem('value');
    const maxValueFromLS = localStorage.getItem('maxValue');
    if (startValueFromLS) {
      setValue(Number(startValueFromLS));
    }
    if (maxValueFromLS) {
      setMaxValue(Number(maxValueFromLS));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('value', String(startValue));
  }, [startValue]);

  useEffect(() => {
    localStorage.setItem('maxValue', String(maxValue));
  }, [maxValue])

  const [visibleValue, setVisibleValue] = useState(startValue);

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
    setValue(value);
  }


  const handleMaxValueChange = (value: number) => {

    if (value <= startValue) {
      setError("Max value can't be smaller or equal to Start Value")
    }

    if (error && value > startValue) {
      setError("");
    }
    setMaxValue(value);
  }

  const [error, setError] = useState("");

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
