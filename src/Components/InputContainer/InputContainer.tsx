import { ChangeEvent } from 'react';
import s from './InputContainer.module.css';

type InputContainerPropsType = {
    text: string
    value: number
    error: boolean
    onChangeHandler: (value: number) => void
}

const InputContainer = (props: InputContainerPropsType) => {

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChangeHandler(Number(e.currentTarget.value));
    }

    let inputClasses = `${s.counter__input}`;
    if (props.error) inputClasses += ` ${s.inputError}`;

    return (
        <div className={s.counter_inputContainer}>
            {props.text}:
            <input className={inputClasses} type="number" value={props.value} onChange={handleInputChange} />
        </div>
    );
}

export default InputContainer;