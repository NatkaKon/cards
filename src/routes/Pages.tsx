import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {PATH} from '../common/constants/path';
import {Login} from '../features/Login/Login';
import {NewPassword} from '../features/NewPassword/NewPassword';
import {PasswordRecovery} from '../features/PasswordRecovery/PasswordRecovery';
import {Profile} from '../features/Profile/Profile';
import {Registration} from '../features/Registration/Registration';
import {Test} from '../features/TEST/Test';
import {Error404} from '../features/Error404/Error404';

export const Pages = () => {
        return (
                <Routes>
                    <Route path={PATH.LOGIN} element={<Login/>}/>
                    <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                    <Route path={PATH.PROFILE} element={<Profile/>}/>
                    <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecovery/>}/>
                    <Route path={PATH.NEW_PASSWORD} element={<NewPassword/>}/>
                    <Route path={PATH.NAVIGATE_ERROR} element={<Error404/>}/>
                    <Route path={PATH.ERROR404} element={<Navigate to="/404"/>}/>
                    <Route path={PATH.TEST} element={<Test/>}/>
                </Routes>
        );
};

