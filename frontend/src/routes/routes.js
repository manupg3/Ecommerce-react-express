import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Page404 from "../pages/404page";
import HomePage from "../pages/home";
import ContactPage from "../pages/contact";
import AboutPage from "../pages/about";
import StorePage from '../pages/store';
import AccountPage from '../pages/account';

const RoutesApp = () => (
    <Routes>

        <Route exact path='/' element={<HomePage />} />
        <Route exact path='/store' element={<StorePage />} />
        <Route exact path='/about' element={<AboutPage />} /> 
        <Route exact path='/contact' element={<ContactPage />} />
        <Route exact path='/account' element={<AccountPage />} />

        <Route element={<Page404 />} />
    </Routes>
);

export default RoutesApp;