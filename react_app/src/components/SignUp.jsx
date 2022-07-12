import React from 'react';



const SignUp = () => {
    return (
        <div className={"sign_up_container"}>
            <div className={"instruction_text"}>1. Send /start to
                <a target="_blank" rel="noopener noreferrer" href={"https://t.me/wierexBot"}>@wierexBot</a>
            </div>
            <div className={"instruction_text"}>2. Generate user_token</div>
            <div className={"instruction_text"}>3. Enter you token in c4d plugin</div>
            <div className={"instruction_text"}>4. Start rendering in queue then press sync button</div>
        </div>
    );
};

export default SignUp;