import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import postsPageReducer from "./postsPage-reducer"

export const store = createStore(
	postsPageReducer,
	composeWithDevTools(applyMiddleware(thunk))
)