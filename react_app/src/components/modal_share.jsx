import React from 'react';
import {ReactComponent as Link}  from "../icons/Link-2.svg"


const ModalShare = (props) => {



    async function copy_text(){

        await navigator.clipboard.writeText(props.share_link)


    }








    return (
        <div className={"modal_share_container"}>
            <div className={"modal_share_bg"} onClick={()=>{props.setModal_share(false)}}>
            </div>
            <div className={"modal_share"}>
                <div className={"link_container"}>
                    <Link className={"link_icon"}/>
                    <div className={"link_text"}>
                        {
                            props.share_link
                        }

                    </div>
                </div>
                <div className={"copy_button"} onClick={copy_text}>
                    <div>
                        Copy
                    </div>
                </div>
                <div className={"close_button"}>

                </div>

            </div>
        </div>
    );
};

export default ModalShare;