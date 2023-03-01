import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {PATH} from '../common/path';

export const Pages = () => {
        return (
                <Routes>
                    <Route path={PATH.LOGIN} element={<div>Login</div>}/>
                    <Route path={PATH.REGISTRATION} element={<div>Registration</div>}/>
                    <Route path={PATH.PROFILE} element={<div>Profile</div>}/>
                    <Route path={PATH.PASSWORD_RECOVERY} element={<div>Password Recovery</div>}/>
                    <Route path={PATH.NEW_PASSWORD} element={<div>Create password</div>}/>
                    <Route path={PATH.NAVIGATE_ERROR} element={<h1 style={{textAlign: 'center'}}>404 page not found</h1>}/>
                    <Route path={PATH.ERROR404} element={<Navigate to="/404"/>}/>
                    <Route path={PATH.TEST} element={'test'}/>
                </Routes>
        );
};

