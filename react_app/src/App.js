import LogIn from "./components/log_in";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavBar from "./components/navBar";
import Dashboard from "./components/dashboard";
import ProtectedRouteIn from "./components/ProtectedRouteIn";
import Home from "./components/Home";
import ProtectedRouteOut from "./components/ProtectedRouteOut";
import NotFound from "./components/notFound";
import useLocal from "./hooks/useLocal";
import "./styles/index.css"
import Shared from "./components/Shared";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import Download from "./components/download";
import SignUp from "./components/SignUp";


function App() {

    const dispatch = useDispatch()



    const local = useLocal(dispatch)


    useEffect(()=>{


        local()


    }, [])






    return (
    <BrowserRouter>
                <NavBar/>
                <Routes>


                    <Route exact path="/" element={<Home />}/>
                    <Route exact path="/download" element={<Download/>}/>
                    <Route exact path="/log_in" element={
                        <ProtectedRouteOut link={"/"}>
                            <LogIn/>
                        </ProtectedRouteOut>
                    }/>
                    <Route exact path="/sign_up" element={
                        <ProtectedRouteOut link={"/"}>
                            <SignUp/>
                        </ProtectedRouteOut>
                    }/>

                    <Route exact path="/dashboard" element={
                        <ProtectedRouteIn>
                            <Dashboard/>
                        </ProtectedRouteIn>
                    }/>

                    <Route path={"/shared:token"} element={<Shared/>}/>


                    <Route path="*" element={<NotFound/>}/>
                </Routes>
    </BrowserRouter>
    );
}

export default App;
