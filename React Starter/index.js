import React from 'react';
import ReactDOM from 'react-dom';


const App = () => (
  <div>Hello React</div>
);


const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);