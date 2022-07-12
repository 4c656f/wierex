import React from 'react';
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const ProtectedRouteIn = ({children }) => {

    const is_login = useSelector(state => state.isLogin.isLogin)

    if (!is_login) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRouteIn;