import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import RegisterPage from "./pages/RegisterPage";

function App() {

    return (
        <div className="App">

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <BrowserRouter>
                <div className="App-container">

                    <header className="App-header">
                        <Navigation/>
                    </header>

                    <main>
                        <div className="App-main">
                            <div className="content">
                                <Routes>
                                    <Route path='/' element={<HomePage/>}></Route>
                                    {/*<Route path='/session' element={<SessionPage/>}></Route>*/}
                                    <Route path='/register' element={<RegisterPage/>}></Route>
                                </Routes>
                            </div>
                        </div>
                    </main>

                    <div className="App-footer">
                        <footer className="footer">
                            <p>&copy; 2023 Aline Murillo</p>
                        </footer>
                    </div>

                </div>
            </BrowserRouter>

        </div>

    );
}

export default App;
