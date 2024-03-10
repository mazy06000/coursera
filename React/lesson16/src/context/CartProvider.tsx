import React, { useMemo } from "react"

export type CartItemType = {
    sku: string,
    name: string,
    price: number,
    qty: number,
}

type CartStateType = {
    cart: CartItemType[],
}

const initCartState: CartStateType = {
    cart: [],
}

const REDUCER_ACTION_TYPES = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    QUANTITY: 'QUANTITY',
    SUBMIT: 'SUBMIT',
}

export type ReducerActionType = typeof REDUCER_ACTION_TYPES

export type ReducerAction = {
    type: string,
    payload?: CartItemType,
}

const reducer = (state: CartStateType, action: ReducerAction): CartStateType => {
    switch (action.type) {
        case REDUCER_ACTION_TYPES.ADD: {
            if (!action.payload) {
                throw new Error('action.payload is required for ADD action type')
            }
            const { sku, name, price } = action.payload
            const filteredCart: CartItemType[] = state.cart.filter(item => item.sku !== sku)
            const itemExists: CartItemType | undefined = state.cart.find(item => item.sku === sku)
            const qty: number = itemExists ? itemExists.qty + 1 : 1
            return {
                ...state,
                cart: [...filteredCart, { sku, name, price, qty }]
            }
        }
            
        case REDUCER_ACTION_TYPES.REMOVE: {
            if (!action.payload) {
                throw new Error('action.payload is required for REMOVE action type')
            }
            const { sku } = action.payload
            const filteredCart: CartItemType[] = state.cart.filter(item => item.sku !== sku)

            return {
                ...state,
                cart: [...filteredCart]
            }
        }

        case REDUCER_ACTION_TYPES.QUANTITY: {
            if (!action.payload) {
                throw new Error('action.payload is required for QUANTITY action type')
            }
            const { sku, qty } = action.payload
            
            const itemExists: CartItemType | undefined = state.cart.find(item => item.sku === sku)
            
            if (!itemExists) {
                throw new Error('Item does not exist in cart')
            }
            
            const updatedItem: CartItemType = {
                ...itemExists,
                qty
            }

            const filteredCart: CartItemType[] = state.cart.filter(item => item.sku !== sku)

            return {
                ...state,
                cart: [...filteredCart, updatedItem]
            }
        }

        case REDUCER_ACTION_TYPES.SUBMIT: {
            return {
                ...state, cart: []
            }
        }
        default:
            throw new Error('Invalid action type')
    }
}

const useCartContext = (initCartState: CartStateType) => {
    const [state, dispatch] = React.useReducer(reducer, initCartState)

    const REDUCER_ACTIONS = useMemo(() => {
        return REDUCER_ACTION_TYPES
    }, [])

    const totalItems = state.cart.reduce((previousValue, cartItem) => {
        return previousValue + cartItem.qty
    }, 0)

    const totalPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(state.cart.reduce((previousValue, cartItem) => {
        return previousValue + (cartItem.price * cartItem.qty)
    }, 0))

    const cart = state.cart.sort((a, b) => {
        const itemA = Number(a.sku.slice(-4))
        const itemB = Number(b.sku.slice(-4))
        return itemA - itemB
    })
    
    return {
        dispatch,
        REDUCER_ACTIONS,
        totalItems,
        totalPrice,
        cart,
    }
}

export type UseCartContextType = ReturnType<typeof useCartContext>

const initCartContextState: UseCartContextType = {
    dispatch: () => {},
    REDUCER_ACTIONS: REDUCER_ACTION_TYPES,
    totalItems: 0,
    totalPrice: '',
    cart: [],
}

export const CartContext = React.createContext<UseCartContextType>(initCartContextState)

type ChildrenType = { children?: React.ReactElement | React.ReactElement[] }

export const CartProvider = ({ children }: ChildrenType): React.ReactElement => {
    const contextValue = useCartContext(initCartState)

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext