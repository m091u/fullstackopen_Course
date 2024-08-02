import {createStore} from 'redux';
import reducer from './reducer';

//higher order function - takes the reducer function as argument
const store = createStore(reducer)

export default store;