import React, { useEffect } from "react"

export type ProductType = {
    sku: string,
    name: string,
    price: number,
}

const initState: ProductType[] = []
// const initState: ProductType[] = [
//     {
//         "sku": "item0001",
//         "name": "Widget",
//         "price": 9.99
//     },
//     {
//         "sku": "item0002",
//         "name": "Premium Widget",
//         "price": 19.99
//     },
//     {
//         "sku": "item0003",
//         "name": "Deluxe Widget",
//         "price": 29.99
//     }
// ]

export type UseProductsContextType = {
    products: ProductType[],
}

const initContextState: UseProductsContextType = {
    products: [],
}

const ProductsContext = React.createContext<UseProductsContextType>(initContextState)

type ChildrenType = { children?: React.ReactElement | React.ReactElement[] }

export const ProductsProvider = ({ children }: ChildrenType) => {
    const [products, setProducts] = React.useState<ProductType[]>(initState)

    useEffect(() => {
        const fetchProducts = async (): Promise<ProductType[]> => {
            const data = await fetch('http://localhost:3500/products').then(res => res.json())

            return data
        }

        fetchProducts().then(products => setProducts(products))
    
    }, [])

    return (
        <ProductsContext.Provider value={{ products }}>
            {children}
        </ProductsContext.Provider>
    )
}

export default ProductsContext