import React from "react";
import CartCSS from './Cart.module.css';
import { FiShoppingCart } from 'react-icons/fi';
import { AppStateContext } from "./AppState";

interface Props { }

interface State {
    isOpen: boolean;
}

class Cart extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isOpen: false,
        }
    }

    // with a structure like this you do not need to bind the function in a component class:
    // function = (args)=> {}
    handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log(e.currentTarget);
        if ((e.target as HTMLElement).nodeName === "SPAN") {
            // (e.target as HTMLSpanElement)
        }
        this.setState((prevState) => ({ isOpen: !prevState.isOpen }))
    }

    render() {
        return (
            // render something based on the context value
            <AppStateContext.Consumer>{(state) => {
                // reduce is used to add up to a total
                const itemCount = (state.cart.items).reduce((sum, item) => {
                    return sum + item.quantity
                }, 0)
                return <div className={CartCSS.cartContainer}>
                    <button className={CartCSS.button} type="button" onClick={this.handleClick}>
                        <FiShoppingCart />
                        <span>
                            {itemCount} pizza(s)
                        </span>
                    </button>
                    <div className={CartCSS.cartDropDown} style={{
                        display: this.state.isOpen ? 'block' : 'none'
                    }}>
                        <ul>
                            {(state.cart.items).map((item) => {
                                return <li key={item.id}>{item.name} &times; {item.quantity}</li>
                            })}
                        </ul>
                    </div>
                </div>
            }}</AppStateContext.Consumer>
        )
    }
}

export default Cart;