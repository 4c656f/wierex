
const defaultState = {
    userToken: null,
}


export const tokenReducer = (state = defaultState, action) =>{
    switch (action.type){



        case "USER_TOKEN":

            return {userToken: action.payload}

        default:
            return state

    }

}
