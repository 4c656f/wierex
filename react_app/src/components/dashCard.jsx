import React from 'react';
import "../styles/dashboard.css"

import {ReactComponent as Share}  from "../icons/Share.svg"





const DashCard = (props) => {

    console.log(props.value)
    if(props.value["status"] === "In Progress"){


        let perc = (100 * parseFloat(props.value["progress"])).toFixed(0)



        function hmsToSecondsOnly() {
            let p = props.value["time"].split(':');

            let str = ""
            p.map(
                (val, i)=>{
                if(val === "0"){
                    return null

                }
                else if(val === "00"){
                    return null

                }
                else {
                    i === 0 ? str += val + "h " : i === 1 ? str += val + "min " : str += val + "s"
                    return null
                }

            })

            return str;
        }



        return (
            <div className={"dash_card"}>
                <div className={"share_container"} onClick={()=>{props.share_f(props.uuid); props.setModal_share(true)}}>
                    <Share className={"share_icon"} />
                </div>
                <div className={"card_left_container"}>
                    <div className={"name_status_container"}>
                        <div className={"job_name"}>
                            {props.value["file_name"]}
                        </div>

                        <div className={"job_status"}>
                            {props.value["status"]}
                        </div>
                    </div>
                    <div className={"progress_time_container"}>
                        <div className={"job_progress"}>
                            {`Progress: ${perc}%`}
                        </div>

                        <div className={"job_time"}>
                            {`Remaining time: ${hmsToSecondsOnly()}`}
                        </div>
                    </div>
                </div>
                <div className={`check_dot check_dot_green`}>

                </div>
                <div style={{width: perc + '%'}} className={"bottom_bar"}>

                </div>






            </div>
        );
    }
    else if(props.value["status"] === "In Queue"){
        return (
            <div className={"dash_card"} >
                <div className={"share_container"} onClick={()=>{props.share_f(props.uuid); props.setModal_share(true)}}>
                    <Share className={"share_icon"} />
                </div>
                <div className={"card_left_container"}>
                    <div className={"name_status_container"}>
                        <div className={"job_name"}>
                            {props.value["file_name"]}
                        </div>

                        <div className={"job_status"}>
                            {props.value["status"]}
                        </div>
                    </div>

                </div>
                <div className={`check_dot check_dot_gray`}>

                </div>






            </div>
        );
    }
    else if(props.value["status"] === "Finished"){
        return (
            <div className={"dash_card"} >
                <div className={"share_container"} onClick={()=>{props.share_f(props.uuid); props.setModal_share(true)}}>
                    <Share className={"share_icon"} />
                </div>
                <div className={"card_left_container"}>
                    <div className={"name_status_container"}>
                        <div className={"job_name"}>
                            {props.value["file_name"]}
                        </div>

                        <div className={"job_status"}>
                            {props.value["status"]}
                        </div>
                    </div>

                </div>
                <div className={`check_dot check_dot_fin`}>

                </div>






            </div>
        );
    }else if(props.value["status"] === "Stopped"){
        return (
            <div className={"dash_card"} >
                <div className={"share_container"} onClick={()=>{props.share_f(props.uuid); props.setModal_share(true)}}>
                    <Share className={"share_icon"} />
                </div>
                <div className={"card_left_container"}>
                    <div className={"name_status_container"}>
                        <div className={"job_name"}>
                            {props.value["file_name"]}
                        </div>

                        <div className={"job_status"}>
                            {props.value["status"]}
                        </div>
                    </div>

                </div>
                <div className={`check_dot check_dot_orange`}>

                </div>






            </div>
        );
    }




    return (
        <div className={"dash_card"}>

            {props.value["file_name"]}
            
        </div>
    );
};

export default React.memo(DashCard);