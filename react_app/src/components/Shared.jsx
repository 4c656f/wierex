import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import DashSharedCard from "./dashsharedcard";
import useGetShared from "../hooks/useGetShared";
import DashCard from "./dashCard";
import {ReactComponent as Swap} from "../icons/Swap.svg";
import ModalShare from "./modal_share";
import DashLoader from "./dashLoader";



const Shared = () => {

    const {token} = useParams()




    const [is_loading, setIs_loading] = useState(true)
    const [render_data, setRender_data] = useState([])
    const [length, setLength] = useState()
    const [loop, setLoop] = useState(false)
    const [share_link, setShare_link] = useState('')



    const data = useGetShared(setRender_data, setLoop, token, setIs_loading)

    useEffect(()=>{
        data()

    }, [])


    function update_f(){
        !loop
            ?
            data()
            :
            data().then((data)=> {data()})

    }


    useEffect(()=>{
        setLength(Object.keys.length)
    }, [render_data])




    return (

        <div className={"dashboard"}>

                {
                    is_loading ? <div className={"pre_loader_dash"}> <DashLoader/></div>

                        :

                        length > 0?
                            <div className={"cards_container"}>{
                                Object.entries(render_data).map(([key,value])=>{
                                    return <DashSharedCard  className={"card"} value = {value} key={key}></DashSharedCard>
                                })}
                                <div className={"swap_container"} onClick={update_f}>
                                    <Swap className = {"swap"}  />
                                </div>
                            </div>
                            : <div className={"empty_jobs"}>"u haven't jobs"</div>

                }




        </div>
    );
};

export default Shared;