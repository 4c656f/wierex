import React from 'react';
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const ProtectedRouteOut = ({children, link }) => {

    const is_login = useSelector(state => state.isLogin.isLogin)

    if (is_login) {
        return <Navigate to={link} replace />;
    }

    return children;
};

export default ProtectedRouteOut;