import { applyMiddleware, combineReducers, legacy_createStore as createStore, compose} from "redux";
import thunkMiddleware from "redux-thunk";
import postsPageReducer from "./postsPage-reducer"

let reducers = combineReducers({
    postsPage: postsPageReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

window.__store__ = store;

export default store;