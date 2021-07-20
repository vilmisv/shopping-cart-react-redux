import { actions } from "./actions"
import { types } from "./const"


function getTotalValue(list, key) {
    return list.reduce((total, current) => total + current[key], 0).toFixed(2)
}

const defaultState = {
    cart: [],
    list: [],
    searchField: '',
    selectedItem: null,
    filteredItems: '',
    category: '',
    totalPrice: 0,
}

export const shoppingReducer = (state = defaultState, action) => {
    const {type, payload} = action
    switch (type) {
        case types.SET_LIST:
            return { ...state, list: payload}

            case types.SHOW_MODAL:
                return { ...state, selectedItem: payload }

            case types.HIDE_MODAL: 
                return { ...state, selectedItem: null }

            case types.ADD_TO_CART:  {
            const item = state.list.find(({ id }) => id === payload)
            const newCart = [...state.cart, item]
               
            return {...state, 
                totalPrice: getTotalValue(newCart, 'price'),
                cart: newCart}
            }
            case types.REMOVE_FROM_CART: {
                const itemIndex = state.cart.findIndex(({ id }) => id === payload)
                state.cart.splice(itemIndex, 1)
            return {...state, 
                totalPrice: getTotalValue(state.cart, 'price'),
                cart: [...state.cart]}
            }
            case types.SEARCH_FIELD: {

                return { ...state, searchField: payload}
            }
            case types.FILTER_BY_CATEGORY:
                return {...state, filteredItems: payload}

            case types.DELETE_ALL_CART: 
            state.cart.splice(0, state.cart.length)
            const newCart = [...state.cart]
            
                return {...state, 
                    totalPrice: getTotalValue(state.cart, 'price'),
                    cart: newCart}
            default:
                return state
    }
} 