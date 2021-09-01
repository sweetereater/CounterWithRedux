import { Dispatch } from 'redux';
import { AppStateType } from './store';
const INCREMENT_VALUE = "INCREMENT-VALUE";
const RESET_VALUE = "RESET-VALUE";
const TOGGLE_SETTINGS = "TOGGLE-SETTINGS";
const SET_ERROR = "SET-ERROR";
const SET_START_VALUE = "SET_START_VALUE";
const SET_MAX_VALUE = "SET_MAX_VALUE";
const SET_VALUE_IN_LOCAL_STORAGE = "SET_VALUE_IN_LOCAL_STORAGE";
const GET_VALUE_FROM_LOCAL_STORAGE = "GET_VALUE_FROM_LOCAL_STORAGE"


export const initialState = {
    startValue: 0,
    maxValue: 5,
    counterValue: 0,
    error: false,
    settings: false
}

type IncrementValueType = ReturnType<typeof incrementValue>
type ResetValueType = ReturnType<typeof resetValue>
type ToggleSettingsType = ReturnType<typeof toggleSettings>
type SetErrorType = ReturnType<typeof setError>
type SetStartValueType = ReturnType<typeof setStartValue>
type SetMaxValueType = ReturnType<typeof setMaxValue>
type SetValueInLocalStorage = ReturnType<typeof setValueInLocalStorage>
type GetValueFromLocalStorage = ReturnType<typeof getValueFromLocalStorage>

type ActionType =
    IncrementValueType |
    ResetValueType |
    ToggleSettingsType |
    SetErrorType |
    SetStartValueType |
    SetMaxValueType |
    SetValueInLocalStorage |
    GetValueFromLocalStorage

export type StateType = typeof initialState;

const CounterReducer = (state: StateType = initialState, action: ActionType): StateType => {
    switch (action.type) {
        case INCREMENT_VALUE:
            return { ...state, counterValue: state.counterValue + 1 }

        case RESET_VALUE:
            return { ...state, counterValue: state.startValue };

        case TOGGLE_SETTINGS:
            return { ...state, settings: !state.settings };

        case SET_START_VALUE:
            // return { ...state, counterValue: action.startValue, startValue: action.startValue }
            return { ...state, startValue: action.startValue }

        case SET_MAX_VALUE:
            return { ...state, maxValue: action.maxValue }

        case SET_ERROR:
            return { ...state, error: action.error }

        case GET_VALUE_FROM_LOCAL_STORAGE:
            return { ...state, [action.payload.key]: action.payload.value }

        case SET_VALUE_IN_LOCAL_STORAGE:
            return { ...state, [action.payload.key]: action.payload.value }

        default:
            return state
    }
}

export const incrementValue = () => {
    return {
        type: INCREMENT_VALUE
    } as const;
}

export const resetValue = () => {
    return {
        type: RESET_VALUE
    } as const;
}

export const toggleSettings = () => {
    return {
        type: TOGGLE_SETTINGS
    } as const;
}

export const setError = (error: boolean) => {
    return {
        type: SET_ERROR,
        error: error
    } as const;
}

export const setStartValue = (startValue: number) => {
    return {
        type: SET_START_VALUE,
        startValue: startValue,
    } as const;
}

export const setMaxValue = (maxValue: number) => {
    return {
        type: SET_MAX_VALUE,
        maxValue: maxValue
    } as const;
}

export const getValueFromLocalStorage = (key: string, value: number) => {
    return {
        type: GET_VALUE_FROM_LOCAL_STORAGE,
        payload: {
            key, value
        }
    } as const;
}

export const setValueInLocalStorage = (key: string, value: number) => {
    return {
        type: SET_VALUE_IN_LOCAL_STORAGE,
        payload: {
            key, value
        }
    } as const;
}

// THUNKS

export const getStartValueFromLocaleStorageTC = () => (dispatch: Dispatch, getState: () => AppStateType) => {
    const state = getState().counter;

    let valueFromLocalStorage: string | null = localStorage.getItem("startValue");
    let value = valueFromLocalStorage ? Number(valueFromLocalStorage) : state.startValue;

    dispatch(getValueFromLocalStorage("startValue", value));
    dispatch(resetValue());
}

export const getMaxValueFromLocaleStorageTC = () => (dispatch: Dispatch, getState: () => AppStateType) => {
    const state = getState().counter;

    let valueFromLocalStorage: string | null = localStorage.getItem("maxValue");
    let value = valueFromLocalStorage ? Number(valueFromLocalStorage) : state.maxValue;

    dispatch(getValueFromLocalStorage("maxValue", value));
    dispatch(resetValue());
}

export const setValueInLocalStorageTC = (key: string, value: number) => (dispatch: Dispatch) => {
    console.log('<<< INSIDE setValueInLocalStorageTC >>> ')
    console.log(`setValuesInLS arguments: key - ${key}, value - ${value}`);
    localStorage.setItem(key, JSON.stringify(value));
    dispatch(setValueInLocalStorage(key, value))

}



export default CounterReducer;