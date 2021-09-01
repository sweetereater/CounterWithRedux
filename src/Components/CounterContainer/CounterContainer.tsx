import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppStateType } from '../../redux/store';
import InputContainer from '../InputContainer/InputContainer';
import { initialState, StateType } from '../../redux/CounterReducer';
import { setStartValue, setMaxValue, incrementValue, resetValue, setError, toggleSettings, setValueInLocalStorageTC, getStartValueFromLocaleStorageTC, getMaxValueFromLocaleStorageTC } from '../../redux/CounterReducer';
import './CounterContainer.css';

function CounterContainer() {

    const { startValue, counterValue, maxValue, error, settings } = useSelector<AppStateType, StateType>(state => state.counter);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStartValueFromLocaleStorageTC());
        dispatch(getMaxValueFromLocaleStorageTC());
    }, []);


    useEffect(() => {
        if (startValue !== initialState.startValue) {
            dispatch(setValueInLocalStorageTC('startValue', startValue))
        }
    }, [startValue])

    useEffect(() => {
        if (maxValue !== initialState.maxValue) {
            dispatch(setValueInLocalStorageTC('maxValue', maxValue));
        }

    }, [maxValue])





    let counterValueClasses = "counter__Value";
    let incButtonClasses = "counter__button";
    let settingsButtonClasses = "counter__button";

    if (counterValue === maxValue) {
        incButtonClasses += " disabledButton";
        counterValueClasses += " limit";
    }

    if (error) {
        settingsButtonClasses += " disabledButton";
    }

    const handleValueChange = (value: number) => {
        if (value >= maxValue) {
            dispatch(setError(true))
        }

        if (error && value < maxValue) {
            dispatch(setError(false));
        }
        dispatch(setStartValue(value))
    }

    const handleMaxValueChange = (value: number) => {

        if (value <= startValue) {
            dispatch(setError(true))
        }

        if (error && value > startValue) {
            dispatch(setError(false))
        }
        dispatch(setMaxValue(value));
    }


    const handleIncrementClick = () => dispatch(incrementValue());
    const handleResetClick = () => dispatch(resetValue());
    const handleSettingsClick = () => dispatch(toggleSettings());

    return (
        <div className="counter container">
            <div>
                <div className="counter__ValueContainer container">
                    {!settings ?
                        <div className={counterValueClasses}>{counterValue}</div> :
                        <div className="counter_inputsContainer">
                            <InputContainer text="Start value" value={startValue} error={error} onChangeHandler={handleValueChange} />
                            <InputContainer text="Max value" value={maxValue} error={error} onChangeHandler={handleMaxValueChange} />
                        </div>}
                </div>

                <div className="counter__Buttons container">
                    {
                        !settings && <>
                            <button
                                className={incButtonClasses}
                                onClick={handleIncrementClick}
                                disabled={counterValue >= maxValue}
                            >
                                Inc
                            </button>
                            <button
                                className="counter__button"
                                onClick={handleResetClick}
                            >
                                Reset
                            </button>
                        </>
                    }
                    <button
                        className={settingsButtonClasses}
                        onClick={handleSettingsClick}
                        disabled={!!error}
                    >
                        {settings ? "Close Settings" : "Show settings"}
                    </button>
                </div>
            </div>
        </div >
    )
}

export default CounterContainer;