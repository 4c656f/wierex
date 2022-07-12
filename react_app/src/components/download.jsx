import React from 'react';
import b64ToBlob from "b64-to-blob";
import fileSaver from "file-saver";
import Axios from "axios";
import "../styles/download.css"


const Download = () => {

    async function download (ver){





        const res = await Axios({
            method: 'GET',
            responseType: 'blob',
            url: 'http://127.0.0.1:9002/download',
            params: {
                    "version": ver
                }

        })

        let data = await res.data.text()

        const blob = b64ToBlob(data, "application/zip");
        fileSaver.saveAs(blob, `wierex.zip`);

    }



    return (
        <div className={"download_main_container"}>
            <div className={"download_container"}>
                <div className={"button_download"} onClick={()=>download(20)}>
                    <div>
                        Download r20
                    </div>
                </div>

            </div>
            <div className={"download_container"}>
                <div className={"button_download"} onClick={()=>download(23)}>
                    <div>
                        Download s23+
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Download;