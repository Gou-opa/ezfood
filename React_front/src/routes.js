import React from 'react';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import MenuPage from './pages/MenuPage/MenuPage';
import Loggin from './components/login/login';
import Register from './components/register/register';
import PickTablePage from './pages/pickTablePage/pickTablePage';
import ManagerPage from './pages/ManagerPage/ManagerPage';
import DashBoardPage from './pages/DashBoardPage/DashBoardPage';
import EditMenu from './pages/EditMenu/EditMenu';
import AddTablePage from './pages/AddTablePage/AddTablePage';
import Decentraliztion from './pages/NotFoundPage/decentralization'

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
        path : '/picktable',
        exact : true,
        main : ()=> <PickTablePage/>
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
        path : '/khongdu',
        exact :false,
        main :() => <Decentraliztion  />
    },
    {
        path : '',
        exact :false,
        main :() => <NotFoundPage />
    }
   

];

export default routes;