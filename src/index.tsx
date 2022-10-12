import React from 'react';
import ReactDOM from 'react-dom';

const message: string = "Hello World";

const App = () => {
    return <div>{message}</div>;
}

ReactDOM.render(<App />, document.getElementById('root'))