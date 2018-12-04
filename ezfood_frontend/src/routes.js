import React from 'react';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ManagerPage from './pages/ManagerPage/ManagerPage';
import MenuPage from './pages/MenuPage/MenuPage';
import Loggin from './components/login/login';
import Register from './components/register/register';
import DashBoardPage from './pages/DashBoardPage/DashBoardPage';
import EditMenu from './pages/EditMenu/EditMenu';
import AddTablePage from './pages/AddTablePage/AddTablePage';

const routes = [
    {
        path : '/',
        exact : true,
        main : ()=> <Loggin />
    },
    {
        path : '/login',
        exact : true,
        main : ()=> <Loggin />
    },
    {
        path : '/register',
        exact : true,
        main : ()=> <Register />
    },
    {
        path : '/menu',
        exact : true,
        main : ()=> <MenuPage />
    },
    {
        path : '/manager',
        exact : true,
        main : ()=> <ManagerPage />
    },
    {
        path : '/dashboard',
        exact : false,
        main : ()=> <DashBoardPage />
    },
    {
        path : '/editmenu',
        exact : false,
        main : ()=> <EditMenu />
    },
    {
        path : '/addtable',
        exact : false,
        main : ()=> <AddTablePage />
    },
    {
        path : '',
        exact :false,
        main :() => <NotFoundPage />
    }

];

export default routes;