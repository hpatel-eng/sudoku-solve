import React from 'react';
import ReactDOM from 'react-dom';
import SudokuGrid from './components/SudokuGrid';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import AlertTemplate from 'react-alert-template-oldschool-dark';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';

const options = {
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE
  }

class App extends React.Component{

    render(){
        return (
            <AlertProvider template={AlertTemplate} {...options}>
                <SudokuGrid/>
            </AlertProvider>
        );
    }

}

ReactDOM.render(
    <Provider store={createStore(reducers, applyMiddleware(thunk))}>
        <App/>
    </Provider>
    , 
document.querySelector('#root'));