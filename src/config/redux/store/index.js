import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducer'

//Membuat store global, thunk untuk mengaktifkan async di react
export const store = createStore(reducer, applyMiddleware(thunk));