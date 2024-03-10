import React from "react";
import { CartItemType } from "../context/CartProvider";
import { ReducerActionType, ReducerAction } from "../context/CartProvider";

type CartLineItemProps = {
    item: CartItemType,
    dispatch: React.Dispatch<ReducerAction>,
    REDUCER_ACTIONS: ReducerActionType,
}

const CartLineItem = ({item, dispatch, REDUCER_ACTIONS}: CartLineItemProps) => {

    const img: string = new URL(`../images/${item.sku}.jpg`, import.meta.url).toString()

    const lineTotal: number = item.price * item.qty

    const highestQty = 20 > item.qty ? 20 : item.qty

    const optionValues: number[] = [...Array(highestQty).keys()].map(i => i + 1)

    const options: React.ReactElement[] = optionValues.map(value => {
        return <option key={`opt${value}`} value={value}>{value}</option>
    })

    const onChangeQty = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch({ type: REDUCER_ACTIONS.QUANTITY, payload: { ...item, qty: Number(e.target.value) } })
    }

    const onRemoveFromCart = () => dispatch({ type: REDUCER_ACTIONS.REMOVE, payload: item })

    const content = (
        <li className="cart__item">
            <img src={img} alt={item.name} className="cart__img"/>
            <div aria-label="Item Name">{item.name}</div>
            <div aria-label="Price Per Item">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(item.price)}</div>
            <label htmlFor="itemQty" className="offscreen">Item Quantity</label>
            <select
                name="itemQty"
                id="itemQty"
                value={item.qty}
                className="cart__select"
                aria-label="Item Quantity"
                onChange={onChangeQty}>
                    {options}
            </select>

            <div className="cart__item-subtotal" aria-label="Line Item Subtotal">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(lineTotal)}
            </div>
            <button className="cart__button"  arial-label="Remove Item From Cart" title="Remove Item From Cart" onClick={onRemoveFromCart}>Remove</button>
        </li>
    )
    return content
}

function areItemsEqual({item: prevItem}: CartLineItemProps, {item: nextItem}: CartLineItemProps) {
    return Object.keys(prevItem).every(key => {
        return prevItem[key as keyof CartItemType] === prevItem[key as keyof CartItemType]
    
    })
}    

const MemoizedCartLineItem = React.memo<typeof CartLineItem>(CartLineItem, areItemsEqual)

export default CartLineItem;