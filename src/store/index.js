import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import reducer from "../reducers";
import {composeWithDevTools} from 'redux-devtools-extension';

let store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk))); // Creates the store from the State received from the reducer(s)

export default store;
