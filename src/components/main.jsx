import { Table } from "react-bootstrap"
import { store } from "./store"
import {Provider, useDispatch, useSelector } from 'react-redux'
import {actions} from './actions'
import { useCallback, useEffect, useMemo, useState } from "react"
import './main.css'
import Cart from "./cart"
import selectors from "./selectors"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'

function Element ({ item, action, idKey, actionType}) {
    const { [idKey]: id, title, price, image, category } = item
    const dispatch = useDispatch()
    return (
        <main className='items-container'>
        <div>
        <img className='item-image' src={image}/>
        </div>
        <div>
        <h3>{title}</h3>
        </div>
        <div className='price-con'>
        <div>{price}</div><div>$</div>
        </div>
        <div>
        <span>{category}</span>
        </div>
        <div>
        <button type='button' onClick={() => {
            dispatch(action(id))
        }}>
        {actionType ? 'Add' : 'Remove'}
        </button>
        </div>
        <div>
        <button type='button'
        onClick={() => dispatch(actions.showModal(item.id))}
        >Show More</button>
        </div>

    </main>
    )
}



function MainListWrapper({selector, action, actionType, idKey }) {
    const list = useSelector(selector)
    const searchField = useSelector(({searchField}) => searchField)
    const filteredItems = useSelector(({ filteredItems }) => filteredItems)
    console.log(list) 
    const generateList = useMemo (
        () => 
        list.filter(item => item.category.toLowerCase().includes(filteredItems)).filter(item =>
            item.title.toLowerCase().includes(searchField.toLowerCase())).map((item) => (
            <Element 
            key={item[idKey]}
            item={item}
            action={action}
            actionType={actionType}
            idKey={idKey}
            />
    )),
    [list, searchField, filteredItems]
    )
    return (
    <div className='main-container'>
        <span>{generateList}</span>
    </div>
    )
}

function Modal() {
    const dispatch = useDispatch() 
    const closeModal = useCallback(() => dispatch(actions.hideModal()), [])
    const item = useSelector(({ list, selectedItem }) => 
    list.find(({ id }) => id === selectedItem)
    )
    if (!item) return null
    const { description } = item

    return (
        <div className='modal' onClick={closeModal}>
            <div className='modal-window'
            onClick={(e) => {
                e.stopPropagation()
            }}
            >
            <p>Description</p>
            <h4>{description}</h4>
            <button type='button' className='close-modal-btn' onClick={closeModal}>Close</button>
            </div>
        </div>
    )
}

function SearchAndCategory( {selector, action, actionType }) {
    const dispatch = useDispatch()
    
    return (
        <div className='searchAndCategory-container'>
            <div>
                <label for='category'>Choose a Category</label>

                <select onClick={e => dispatch(actions.filteredCategoryAction(e.target.value))} name='category'>
                <option value="">All</option>
                <option value="men's clothing">Men's clothing</option>
                <option value='jewelery'>Jewelery</option>
                <option value="electronics">Electronics</option>
                <option value="women's clothing">Women's clothing</option>                   
                </select>
            </div>

            <div>
            <input 
            type='search' 
            placeholder='search'
            onChange={e => dispatch(actions.searchFieldAction(e.target.value))}
            />
            </div>
        </div>
    )
}


function ApiData() {
    const dispatch = useDispatch()
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
        .then((response) => response.json())
        .then((data) => dispatch(actions.setListAction(data)))
    }, [])
    const selectedItem = useSelector(({ selectedItem }) => !!selectedItem)
    return (
    <div>
        <MainListWrapper 
        selector={({list}) => list} 
        action={actions.addToCartAction}
        idKey={'id'}
        actionType 
        />
        {selectedItem ? <Modal/> : null}
    </div>
    )
}

function NavBar() {
    const cartLength = useSelector (({ cart }) => cart)
    const totalPrice = useSelector(({ totalPrice }) => totalPrice)
    return (
    <div className='navbarr'>

        <nav className='navBar-container'>
        <ul>
            <Link className='navBarLinks' to='/'><li>Home</li></Link>
            <Link to='/Cart-1'>
            <img src='https://image.flaticon.com/icons/png/512/263/263142.png'/>
            </Link>        
            <span className='cart-items-sum'><div>{cartLength.length}</div></span>
            <span> {totalPrice} $
            </span>
        </ul>
        </nav>
    </div>
    
    )
}

export default function MainWrapper({selector, action, actionType, idKey}) {


    return <Provider store={store}>
    <Router>
    <Switch>
    <Route path="/Cart-1">
    <NavBar />
    <Cart selector={({ cart }) => cart}
    action={actions.removeFromCartAction}
    actionType={false}
    idKey={'customId'}
    />
    </Route>
    <Route path="/">
    <NavBar />
    <SearchAndCategory selector={({searchField}) => searchField}
    action={actions.searchFieldAction}
    actionType
    idKey={'id'}
    />
    <ApiData />      
    </Route>
    </Switch>
    </Router>
    </Provider>
}