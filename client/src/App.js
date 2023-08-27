import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavigationWrapper from './components/NavigationWrapper';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RegisterPage from "./pages/RegisterPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import UserSessionsPage from './pages/UserSessionsPage';
import UserAccountPage from './pages/UserAccountPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

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

                    <NavigationWrapper/>

                    <main>
                        <Routes>
                            <Route path='/' element={<HomePage/>}></Route>
                            <Route path='/about' element={<AboutPage/>}></Route>
                            <Route path='/register' element={<RegisterPage/>}></Route>
                            <Route path='/dashboard' element={<UserDashboardPage/>}></Route>
                            <Route path='/sessions' element={<UserSessionsPage/>}></Route>
                            <Route path='/account' element={<UserAccountPage/>}></Route>
                            <Route path='*' element={<NotFoundPage />}></Route>
                        </Routes>
                    </main>

                    <Footer/>

                </div>
            </BrowserRouter>

        </div>
    );
}

export default App;

