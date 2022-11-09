import React from "react";
import CartCSS from './Cart.module.css';
import { FiShoppingCart } from 'react-icons/fi';
import { AppStateContext } from "./AppState";

interface Props { }

interface State {
    isOpen: boolean;
}

class Cart extends React.Component<Props, State> {
    #containerRef: React.RefObject<HTMLDivElement>;
    constructor(props: Props) {
        super(props);
        this.state = {
            isOpen: false,
        }

        this.#containerRef = React.createRef();
    }

    // with a structure like this you do not need to bind the function in a component class:
    // function = (args)=> {}
    handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.setState((prevState) => ({ isOpen: !prevState.isOpen }))
    };

    handleOutsideClick = (e: MouseEvent) => {
        console.log("clicked");
        // TYPE DIFFERENCE nodes: all nodes  (html, comments, events - like this, etc) | html element: subclass of nodes (html tags)
        if (this.#containerRef.current && !this.#containerRef.current.contains(e.target as Node)) {
            this.setState({ isOpen: false });
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', (e) => this.handleOutsideClick(e))
    }

    // clear eventlistener if unmounts
    componentWillUnmount() {
        document.removeEventListener('mousedown', (e) => this.handleOutsideClick(e))
    }

    render() {
        return (
            // render something based on the context value
            <AppStateContext.Consumer>{(state) => {
                // reduce is used to add up to a total
                const itemCount = (state.cart.items).reduce((sum, item) => {
                    return sum + item.quantity
                }, 0)
                return <div ref={this.#containerRef} className={CartCSS.cartContainer}>
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