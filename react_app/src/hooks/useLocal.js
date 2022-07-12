import {useDispatch} from "react-redux";

import axios from "axios";


const useLocal = (dispatch) => {


    async function wrapper (){

        dispatch({type: "START_LOAD"})


        const userToken = localStorage.getItem("userToken")

        const res = await axios.post("http://127.0.0.1:9002/check_node_token",{
            "node_token": userToken,
        })



        if(res.data){


            dispatch({type: "LOG_IN", payload : true})
            dispatch({type: "USER_TOKEN", payload : userToken})

        }
        else{
            dispatch({type: "LOG_IN", payload : false})
        }

        dispatch({type: "END_LOAD"})






    }


    return wrapper










};

export default useLocal;