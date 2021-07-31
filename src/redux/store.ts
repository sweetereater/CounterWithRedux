import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import CounterReducer from "./CounterReducer";

const rootReducer = combineReducers({
    counter: CounterReducer
})

export type AppStateType = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk));

export type StoreType = typeof store;

export default store;

