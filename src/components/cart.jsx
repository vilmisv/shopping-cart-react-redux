import { Table } from "react-bootstrap"
import { store } from "./store"
import {Provider, useDispatch, useSelector } from 'react-redux'
import {actions} from './actions'
import { useEffect, useMemo } from "react"
import './main.css'

export default function Cart({selector, action, actionType }) {

    const totalPrice = useSelector(({ totalPrice }) => totalPrice)
    const list = useSelector(selector)
    const dispatch = useDispatch()
    console.log(list)
    const generateList = useMemo (
        () => 
        list.map(({id, title, price, image}) => (
    <main className='items-container'>
        <div>
        <img className='item-image' src={image}/>
        </div>
        <div>
        <h3>{title}</h3>
        </div>
        <div className='price-con'>
        <span>{price} $</span>
        </div>
        <div>
        <button type='button' onClick={() => {
            dispatch(action(id))
        }}
        >
        {actionType ? 'Add' : 'Remove'}
        </button>
        </div>
    </main>
    )),
    [list]
    )
    return (
    <div>
        <div className='main-container'>
            <span>{generateList}</span>
                <button className='buy-btn' type='button' onClick={() => {
                dispatch(actions.deleteAllCartAction())
                }}>Buy</button>
                <span>{totalPrice} $</span>

        </div>
    </div>
    )
}