import React from 'react';
import pizzas from '../data/pizzas.json';
import Pizza from './Pizza';
import AppCSS from './App.module.css';
import PizzaSVG from '../svg/pizza.svg';
import Cart from './Cart';
import AppStateProvider from './AppState';
import SpecialOffer from './SpecialOffer';


const App = () => {
    const specialOfferPizza = pizzas.find((pizza) => pizza.specialOffer);
    return (
        // provides the 'global state' for cart to all wrapped components
        <AppStateProvider>
            <div className={AppCSS.container}>
                <div className={AppCSS.header}>
                    <PizzaSVG width={120} height={120} />
                    <div className={AppCSS.siteTitle}>Delicious pizza</div>
                    {/* Cart shows all selected pizzas from the 'global state' and shows them through this component */}
                    <Cart />
                </div>
                {/* if special offers is not undefined or null then show special offer pizza  */}
                {specialOfferPizza && <SpecialOffer pizza={specialOfferPizza} />}
                <ul className={AppCSS.pizzaList}>
                    {pizzas.map(pizza => {
                        return <Pizza key={pizza.id} pizza={pizza} />
                    })}
                </ul>
            </div>
        </AppStateProvider>
    )
}

export default App;