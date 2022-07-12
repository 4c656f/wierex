import {createStore , combineReducers} from "redux";
import {loginReducer} from "./loginReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import {tokenReducer} from "./tokenReducer";
import {barLoader} from "./barLoaderReducer";


const rootReducer = combineReducers({

    isLogin: loginReducer,
    userToken: tokenReducer,
    barLoading: barLoader,





    })


export const store = createStore(rootReducer, composeWithDevTools())