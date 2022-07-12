
const defaultState = {
    Loading: true,
}


export const barLoader = (state = defaultState, action) =>{

    switch (action.type){

        case "START_LOAD":

            return {Loading: true}

        case "END_LOAD":
            return {Loading: false}

        default:
            return state

    }

}
