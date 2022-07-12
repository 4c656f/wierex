import React, {useEffect, useState} from 'react';
import useGetRender from "../hooks/useGetRender";
import DashCard from "./dashCard";
import useShare from "../hooks/useShare";
import ModalShare from "./modal_share";
import {ReactComponent as Swap}  from "../icons/Swap.svg"
import DashLoader from "./dashLoader";


const Dashboard = () => {

    const [render_data, setRender_data] = useState([])
    const [length, setLength] = useState()
    const [loop, setLoop] = useState(false)
    const [share_link, setShare_link] = useState('')
    const [modal_share, setModal_share] = useState(false)
    const [is_loading, setIs_loading] = useState(true)

    const data = useGetRender(setRender_data, setLoop, setIs_loading)
    const share = useShare(setShare_link)




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
        setLength(Object.keys(render_data).length)

    }, [render_data])




    return (
        <div className={"dashboard"}>

            {
                is_loading ? <div className={"pre_loader_dash"}> <DashLoader/></div>

                    :

                    length > 0?
                    <div className={"cards_container"}>{
                    Object.entries(render_data).map(([key,value])=>{
                        return <DashCard setModal_share={setModal_share}  className={"card"} share_f={share} uuid = {key} value = {value} key={key}></DashCard>
                    })}
                        <div className={"swap_container"} onClick={update_f}>
                            <Swap className = {"swap"}  />
                        </div>
                    </div>
                    : <div className={"empty_jobs"}>u haven't jobs</div>

            }





            {modal_share &&
            <ModalShare setModal_share={setModal_share} share_link={share_link}/>
            }
        </div>
    );
};

export default Dashboard;