
const defaultState = {
    isLogin: true,
}


export const loginReducer = (state = defaultState, action) =>{
    switch (action.type){

        case "LOG_IN":

            return {isLogin: action.payload}

        case "LOG_OUT":
            return {isLogin: false}

        default:
            return state

    }

}
