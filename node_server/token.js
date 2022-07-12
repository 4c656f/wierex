import crypto from "crypto";


export function gen_token(user_token){
    let current_date = (new Date()).valueOf().toString();
    return  crypto.createHash('md5').update(current_date + user_token).digest('hex');
}
