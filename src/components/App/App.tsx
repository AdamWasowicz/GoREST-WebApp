
import React from 'react';
import ScreenRouter from '../ScreenRouter';
import NavBar from '../NavBar';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from '../Footer';
import './style.scss';


const App: React.FunctionComponent = () => {
    return (
        <div className='App'>
            <Router>
                <NavBar/>
                <ScreenRouter/>
                <Footer/>
            </Router>
        </div>
    );
};

export default App;