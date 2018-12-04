import React from 'react';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import MenuPage from './pages/MenuPage/MenuPage';
import Loggin from './components/login/login';
import Register from './components/register/register';
<<<<<<< HEAD
import PickTablePage from './pages/pickTablePage/pickTablePage';
import ManagerPage from './pages/ManagerPage/ManagerPage';
import DashbroadPage from './pages/DashboardPage/DashboardPage';
=======
import DashBoardPage from './pages/DashBoardPage/DashBoardPage';
>>>>>>> e29ede48997d43b1a0bbe752e35dc0864ee0baa3


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
        path : '',
        exact :false,
        main :() => <NotFoundPage />
    }

];

export default routes;