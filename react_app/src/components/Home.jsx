import React from 'react';
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <div className={"home_container"}>

            <div  className={"first_screen"}>
                <div className={"first_screen_text"}>

                    Monitor your rendering process
                </div>

                <Link className="home_link" to="/download">
                    download c4d plugin
                </Link>
            </div>

        </div>
    );
};

export default Home;