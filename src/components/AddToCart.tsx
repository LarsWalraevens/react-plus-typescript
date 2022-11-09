import React from 'react';
import { CartItem, useStateDispatch } from './AppState';

export interface AddToCartProps {
    // addToCart expects a function with an item (filtered out quantity) in it 
    addToCart: (item: Omit<CartItem, 'quantity'>) => void;
}

export function withAddToCart<OriginalProps extends AddToCartProps>(ChildComponent: React.ComponentType<OriginalProps>) {
    // Pizza.jsx expects a addtocard, but this is handled in the HOC, so filter this out of the props
    const AddToCartHOC = (props: Omit<OriginalProps, keyof AddToCartProps>) => {
        const dispatch = useStateDispatch();
        // AddToCartProps[item] -> SELECTS ITEM OBJECT IN APPSTATEVALUE
        const handleAddToCartClick: AddToCartProps['addToCart'] = (item) => {
            dispatch({
                type: 'ADD_TO_CART',
                payload: {
                    item
                }
            })
        }
        // give addToCart this new HOC function handler
        return <ChildComponent {...(props as OriginalProps)} addToCart={handleAddToCartClick} />
    }

    return AddToCartHOC;
}

// render props component
// component accepts children that is used as a function with argument (props) and it returns an element
export const WithAddToCartProps: React.FC<{ children: (props: AddToCartProps) => JSX.Element }> = ({ children }) => {
    const dispatch = useStateDispatch();
    // AddToCartProps[item] -> SELECTS ITEM OBJECT IN APPSTATEVALUE
    const addToCart: AddToCartProps['addToCart'] = (item) => {
        dispatch({
            type: 'ADD_TO_CART',
            payload: {
                item
            }
        })
    }
    return children({ addToCart })
}