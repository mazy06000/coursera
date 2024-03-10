import { ProductType } from "../context/ProductsProvider"
import { ReducerActionType, ReducerAction } from "../context/CartProvider"
import React from "react"

type ProductProps = {
    product: ProductType,
    dispatch: React.Dispatch<ReducerAction>,
    REDUCER_ACTIONS: ReducerActionType,
    inCart: boolean,
}

const Product = ({ product, dispatch, REDUCER_ACTIONS, inCart}: ProductProps): React.ReactElement => {

    const img: string = new URL(`../images/${product.sku}.jpg`, import.meta.url).toString()

    const onAddToCart = () => {
        dispatch({ type: REDUCER_ACTIONS.ADD, payload:  {...product, qty: 1} })
    }
    const itemInCart = inCart ? <span>Item in Cart</span> : <button onClick={onAddToCart}>Add to Cart</button>

    const content = (
        <article className="product">
            <h3>{product.name}</h3>
            <img src={img} alt={product.name} className="product__img"/>
            <p>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(product.price)}</p>
            {itemInCart}
        </article>
    )

    return content
}

function areProductsEqual({product: prevProduct, inCart: prevInCart}: ProductProps, {product: nextProduct, inCart: nextInCart}: ProductProps) {
    return Object.keys(prevProduct).every(key => {
        return prevProduct[key as keyof ProductType] === nextProduct[key as keyof ProductType]
    }) && prevInCart === nextInCart
}
const MemoizedProduct = React.memo(Product)

export default MemoizedProduct