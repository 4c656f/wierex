import axios from "axios";


const useShare = (setShare_link) => {




    async function  fetch(uuid)  {


        console.log("share")



        const node_token = localStorage.getItem("userToken")


        const res = await axios.post("http://127.0.0.1:9002/create_share",{
            "node_token": node_token,
            "uuid": uuid,
        })

        setShare_link(`http://wierex.com/shared${res.data}`)

    }


    return fetch








};

export default useShare;