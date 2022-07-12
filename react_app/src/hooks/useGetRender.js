import axios from "axios";


const useGetRender = (setRender_data, setLoop, setIs_loading) => {




        async function  wrapper(){







            let loop = false

            async function  fetch(interval)  {
                const node_token = localStorage.getItem("userToken")


                const res = await axios.post("http://127.0.0.1:9002/render_info",{
                    "node_token": node_token,
                })

                setRender_data(res.data)

                for (const item in res.data)  {

                    if(res.data[item]["status"] === "In Progress"){
                        loop = true
                        setLoop(true)
                        break;
                    }
                    else{
                        setLoop(false)
                        loop = false


                    }

                }
                if(!loop){
                    clearInterval(interval)
                }




            }

            await fetch()
            setIs_loading(false)


            if(loop){

                const interval = setInterval(() => {

                    fetch(interval)



                }, 2000);





                return () => {clearInterval(interval)}








            }


            return ()=> null



















        }





        return wrapper








};

export default useGetRender;