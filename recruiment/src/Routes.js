import logo from './logo.svg';
import './App.css';
import { Navigate } from 'react-router-dom';

import Career from './pages/admin/career/list-career/list-career';
import CreateCareer from './pages/admin/career/create-career/create-career';
import UpdateCareer from './pages/admin/career/update-career/update-career';
import Branch from './pages/admin/branch/list-branch/list-branch';
import CreateBranch from './pages/admin/branch/create-branch/create-branch';
import UpdateBranch from './pages/admin/branch/update-branch/update-branch';
import Account from './pages/admin/account/list-account/list-account';
import ChangePassword from './pages/admin/account/change-password/change-password';
import ProfileCompany from './pages/company/profile/profile-company';
import ProfileUser from './pages/user/profile/profile-user';
import Login from './pages/login/login';
import DetailRecruitment from './pages/recruitment/detail-recruitment/detail-recruitment';
import ListRecruitment from './pages/recruitment/list-recruitment/list-recruitment';
import CreateRecruitment from './pages/recruitment/create-recruitment/create-recruitment';
import ListCV from './pages/recruitment/list-cv/list-cv';
import Chat from './pages/chat/chat';
import SearchRecruitment from './pages/search/search-recruitment/search-recruitment';
import SearchCompany from './pages/search/search-company/search-company';
import SearchUser from './pages/search/search-user/search-user';
import Notification from './pages/notification/notification';
import HomeCompany from './pages/company/home/home-company';
import Home from './pages/Home/Home';
import HomeUser from './pages/user/home/home-user';
import RegisterUser from './pages/register/register-user';
import RegisterCompany from './pages/register/register-company';
import RegisterAdmin from './pages/register/register-admin';
import { useContext, useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Information from './pages/user/profile/information';
import ChangePasswordUser from './pages/user/profile/change-password-user';
import ForgotPassword from './pages/user/profile/forgot-password';
import { UserContext } from './context/userContext';

function AppRoute() {
    const {user} = useContext(UserContext);
    console.log("user: ", user && user.role)
  return (
      <Routes>
        <Route path="/search-recruitment" element={<SearchRecruitment />}></Route>
        <Route path="/search-company" element={<SearchCompany />}></Route>
        <Route path="/search-user" element={<SearchUser />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register-user" element={<RegisterUser />}></Route>
        <Route path="/register-company" element={<RegisterCompany />}></Route>
        <Route path="/company/profile/:id" element={<ProfileCompany />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/user/profile" element={<ProfileUser />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        {user?.role == 'user' && <Route path="/user" element={<HomeUser />}></Route>}

        <Route path="/user/profile" element={<ProfileUser />}>
          {/* <Route path='/user/profile' element={<Navigate replace to='/user/profile/information' />} /> */}
          <Route path='information/:id' element={<Information />}></Route>
          {user?.role == 'user' && <Route path='change-password/:id' element={<ChangePasswordUser />}></Route>}

        </Route>
        if (user?.role == 'user' && user?.role == 'company'){
          <Route path="/notification" element={<Notification />}></Route>
        }
        if (user?.role == 'user' && user?.role == 'company'){
          <Route path="/chat" element={<Chat />}></Route>

        }
        if (user?.role == 'user' && user?.role == 'company'){
          <Route path="/recruitment/detail/:id" element={<DetailRecruitment />}></Route>
        }
        {user?.role == 'company' && <Route path="/company" element={<HomeCompany />}></Route>}
        {user?.role == 'company' && <Route path="/recruitment" element={<ListRecruitment />}></Route>}
        {user?.role == 'company' && <Route path="/recruitment/create" element={<CreateRecruitment />}></Route>}
        {user?.role == 'company' && <Route path="/recruitment/list-cv/:id" element={<ListCV />}></Route>}



        {user?.role == 'admin' && <Route path="/career" element={<Career />}></Route>}
        {user?.role == 'admin' && <Route path="/career/create-career" element={<CreateCareer />}></Route>}
        {user?.role == 'admin' && <Route path="/career/update-career/:id" element={<UpdateCareer />}></Route>}

        {user?.role == 'admin' && <Route path="/branch" element={<Branch />}></Route>}
        {user?.role == 'admin' && <Route path="/branch/create-branch" element={<CreateBranch />}></Route>}
        {user?.role == 'admin' && <Route path="/branch/Update-branch/:id" element={<UpdateBranch />}></Route>}


        {user?.role == 'admin' && <Route path="/account" element={<Account />}></Route>}
        {user?.role == 'admin' && <Route path="/account/change-password/:id" element={<ChangePassword />}></Route>}
        {user?.role == 'admin' && <Route path="/account/register-admin" element={<RegisterAdmin />}></Route>}
        {/* <Route path="/register-admin" element={<RegisterAdmin />}></Route> */}

      </Routes>
  );
}

export default AppRoute;
