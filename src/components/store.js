import { createStore } from 'redux'
import { shoppingReducer } from './reducer'

export const store = createStore(shoppingReducer)