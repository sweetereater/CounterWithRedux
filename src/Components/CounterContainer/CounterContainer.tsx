import InputContainer from '../InputContainer/InputContainer';
import './CounterContainer.css';

type CounterContainerPropsType = {
    startValue: number
    value: number
    maxValue: number
    error: string
    settings: boolean
    incrementValue: () => void
    resetValue: () => void
    toggleSettings: () => void
    handleValueChange: (value: number) => void
    handleMaxValueChange: (value: number) => void
}

function CounterContainer(props: CounterContainerPropsType) {

    let counterValueClasses = "counter__Value";
    let incButtonClasses = "counter__button";
    let settingsButtonClasses = "counter__button";

    if (props.value === props.maxValue) {
        incButtonClasses += " disabledButton";
        counterValueClasses += " limit";
    }

    if (props.error) {
        settingsButtonClasses += " disabledButton";
    }

    return (
        <div className="counter container">
            <div>
                <div className="counter__ValueContainer container">
                    {!props.settings ?
                        <div className={counterValueClasses}>{props.value}</div> :
                        <div className="counter_inputsContainer">
                            <InputContainer text="Start value" value={props.startValue} error={props.error} onChangeHandler={props.handleValueChange} />
                            <InputContainer text="Max value" value={props.maxValue} error={props.error} onChangeHandler={props.handleMaxValueChange} />
                        </div>}
                </div>

                <div className="counter__Buttons container">
                    {
                        !props.settings && <>
                            <button
                                disabled={props.value >= props.maxValue}
                                className={incButtonClasses}
                                onClick={props.incrementValue}>Inc</button>
                            <button
                                className="counter__button"
                                onClick={props.resetValue}
                            >Reset</button>
                        </>
                    }
                    <button
                        className={settingsButtonClasses}
                        onClick={props.toggleSettings}
                        disabled={!!props.error}
                    >
                        {props.settings ? "Close Settings" : "Show settings"}
                    </button>
                </div>
            </div>
        </div >
    )
}

export default CounterContainer;