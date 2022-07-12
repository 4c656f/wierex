import axios from "axios";


const UseLogin = async  (telegram_id, user_token) => {





    const res = await axios.post("http://127.0.0.1:9002/login",{
        "telegram_id": telegram_id,
        "user_token": user_token,
    })



    return res.data

};

export default UseLogin;