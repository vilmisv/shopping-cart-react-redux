
import { types } from "./const";

const setListAction = (payload = []) => ({
    type: types.SET_LIST,
    payload,
})

const addToCartAction = (payload = '') => ({
    type: types.ADD_TO_CART,
    payload,
})

const removeFromCartAction = (payload = '') => ({
    type: types.REMOVE_FROM_CART,
    payload,
})

const showModal = (payload) => ({
    type: types.SHOW_MODAL,
    payload,
})

const hideModal = () => ({
    type: types.HIDE_MODAL,
})

const searchFieldAction = (payload = '') => ({
    type: types.SEARCH_FIELD,
    payload,
})

const filteredCategoryAction = (payload = '') => ({
    type: types.FILTER_BY_CATEGORY,
    payload,
})

const deleteAllCartAction = (payload = '') => ({
    type: types.DELETE_ALL_CART,
    payload,
})


export const actions = {
    setListAction,
    addToCartAction,
    removeFromCartAction,
    showModal,
    hideModal,
    searchFieldAction,
    filteredCategoryAction,
    deleteAllCartAction,
}

