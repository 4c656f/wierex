import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import "../styles/bar.css"


const NavBar = () => {







    const dispatch = useDispatch()
    const is_login = useSelector(state => state.isLogin.isLogin)
    const is_loading = useSelector(state => state.barLoading.Loading)
    const [bar, setBar] = useState(false)

    useEffect(()=>{console.log(is_loading)},[is_loading])






    const logout =() =>{

        localStorage.setItem("userToken", null)



        dispatch({type: "LOG_IN", payload : false})

        dispatch({type: "USER_TOKEN", payload : null})

    };


    function hide_bar(){
        setBar((prev)=> !prev)
    }


    if(is_loading){
        return (
            <div className={"bar_pre_container"}>
                <div className={"pre_el"}></div>
                <div className={"pre_el"}></div>
                <div className={"pre_el"}></div>
            </div>
        )
    }else{

        if(!is_login) {
            return (
                <div>

                    <a className={"logo"} href={"/ "}>
                        <h1>W</h1>
                        <div>.</div>
                    </a>



                    <div className={`bar_container ${bar? "bar_show": ""}`}>

                        <div>

                            <Link className="bar_link" to="/">
                                <div className={"bar_button_container"}>Home</div>
                            </Link>

                        </div>
                        <div>

                                <Link className="bar_link" to="/download">
                                    <div className={"bar_button_container"}>download</div>
                                </Link>

                        </div>

                        <div className="bar_right">

                            <Link className="bar_link" to="/sign_up">
                                <div className={"bar_button_container"}>Sign_up</div>
                            </Link>
                            <Link className="bar_link" to="/log_in">
                                <div className={"bar_button_container"}>Sign_in</div>
                            </Link>


                        </div>



                    </div>
                    <div className={"bar_toggle"} onClick={hide_bar}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>

            );
        }
        return (
            <div>

                <a className={"logo"} href={"/ "}>
                    <h1>W</h1>
                    <div>.</div>
                </a>



                <div className={`bar_container ${bar? "bar_show": ""}`}>


                    <div>
                        <Link className="bar_link" to="/">
                            <div className={"bar_button_container"}>Home</div>
                        </Link>
                    </div>


                    <div>

                            <Link className="bar_link" to="/dashboard">
                                <div className={"bar_button_container"}>Dashboard</div>
                            </Link>

                    </div>
                    <div>

                            <Link className="bar_link" to="/download">
                                <div className={"bar_button_container"}>download</div>
                            </Link>

                    </div>
                    <div className="bar_right">
                        <div className={"bar_button_container"}>
                            <div onClick={logout} style={{cursor: 'pointer'}} className="bar_link" >Logout</div>
                        </div>
                    </div>


                </div>
                <div className={"bar_toggle"} onClick={hide_bar}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
    }
};

export default NavBar;