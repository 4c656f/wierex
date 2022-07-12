import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import UseLogin from "../hooks/useLogin";
import "../styles/log_in.css";
import {ReactComponent as Arrow} from "../icons/Right.svg";

const LogIn = () => {


    const dispatch = useDispatch()



    const [telegram_id, setTelegram_id] = useState()
    const [user_token, setUser_token] = useState()
    const [log_error, setLog_error] = useState([false, ""])
    const [log_error_style, setLog_error_style] = useState(false)


    async function log_in(){


        setLog_error_style(false)


        let data = await UseLogin(telegram_id, user_token)

        console.log(data, "log in")
        if(!data[0]){

            setLog_error([true, data[1]])
            setLog_error_style(true)


        }
        else if (data[0]){
            dispatch({type: "START_LOAD"})

            localStorage.setItem("userToken", data[1])
            dispatch({type: "LOG_IN", payload : data[0]})
            dispatch({type: "USER_TOKEN", payload : data[1]})

            dispatch({type: "END_LOAD"})
        }




    }


    return (
        <div className={"log_in_container"}>
            {log_error[0]
                ?
                <div className={"log_error"}> {log_error[1]}</div>
                :null
            }
            <input className={`input_telegram log_in_el ${log_error_style? "input_error": null}`} defaultValue={telegram_id} placeholder={"telegram_id"} onChange={(event) => setTelegram_id(event.target.value)}/>
            <input className={`input_telegram log_in_el ${log_error_style? "input_error": null}`} defaultValue={user_token} placeholder={"token"} onChange={(event) => setUser_token(event.target.value)}/>
            <div className={"button_log_in log_in_el"} onClick={log_in}>Sign_in
                <Arrow className={"arrow_svg"} />

            </div>
        </div>
    );
};

export default LogIn;