import { postsAPI } from "../api/api";
import { Dispatch } from 'redux'

const SET_POSTS = "SET_POSTS";
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT";
const SET_HAS_MORE = "SET_HAS_MORE";
const SET_LIMIT = "SET_LIMIT";
const SET_IS_LOADING = "SET_IS_LOADING"
const ADD_POST = "ADD_POST"
const LOCALE = "en-US"



interface Payload {
    title: string
    body: string
}

let initialState = {
    posts: [],
    totalCount: 10,
    hasMore: true,
    limit: 3,
    isLoading: false
}

const postsPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POSTS: {
            return { ...state, posts: [...state.posts, ...action.posts] };
        }
        case ADD_POST: {
            const data = action.data
            const newData = {
                ...data,
                fields: {
                    title: data.fields.title[LOCALE],
                    body: data.fields.body[LOCALE],
                },
            }
            console.log(newData)
            return { ...state, posts: [newData, ...state.posts] };
        }
        case SET_TOTAL_COUNT: {
            return { ...state, totalCount: action.totalCount };
        }
        case SET_HAS_MORE: {
            return { ...state, hasMore: action.hasMore };
        }
        case SET_LIMIT: {
            return { ...state, limit: action.limit };
        }
        case SET_IS_LOADING: {
            return { ...state, isLoading: action.isLoading };
        }
        default:
            return state;     
    }   
};

export const setPosts = (posts) => ({type: SET_POSTS, posts});

export const addPost = (data) => ({type: ADD_POST, data });

export const setTotalCount = (totalCount) => ({type: SET_TOTAL_COUNT, totalCount})

export const setHasMore = (hasMore) => ({type: SET_HAS_MORE, hasMore})

export const setLimit = (limit) => ({type: SET_LIMIT, limit})

export const setLoading = (isLoading) => ({type: SET_IS_LOADING, isLoading})

export const getPosts = () => {
    return async (dispatch, getState) => {
      const state = getState();
      if (state.postsPage.isLoading) return;
      dispatch(setLoading(true))
      
      let data = await postsAPI.getPosts(state.postsPage.limit, state.postsPage.posts.length);

      if (state.postsPage.posts.length >= state.postsPage.totalCount) {
        dispatch(setHasMore(false))
        return
      }
      dispatch(setTotalCount(data.total))
      dispatch(setPosts(data.items));
      dispatch(setLoading(false))
    };
};

export const publishPost = (postId, contentfulVersion) => {
    return async (dispatch) => {
        let response = await postsAPI.publishPost(postId, contentfulVersion);
    }
}

export const createPost = ({title, body} : Payload) => {
    return async (dispatch) => {
        let response = await postsAPI.createPost(title, body);
        if (response.status === 201) {
            console.log(response.data)
            dispatch(publishPost(response.data.sys.id, response.data.sys.version))
            dispatch(addPost(response.data))
        } else {
            console.log('Something went wrong: ', response.data.error)
        }
        
    }
}

export default postsPageReducer;