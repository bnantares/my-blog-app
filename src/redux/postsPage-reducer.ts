import { postsAPI } from "../api/api";
import { Dispatch } from 'redux'
import { PostAction, PostActionTypes } from "../types/posts";

const LOCALE = "en-US"


interface CreatePostPayload {
    title: string
    body: string
}

interface PublishPostPayload {
    postId: any
    contentfulVersion: any
}

let initialState = {
    posts: [],
    totalCount: 10,
    hasMore: true,
    limit: 3,
    isLoading: false
}

const postsPageReducer = (state = initialState, action: PostAction): PostState => {
    switch (action.type) {
        case PostActionTypes.SET_POSTS: {
            return { ...state, posts: [...state.posts, ...action.payload] };
        }
        case PostActionTypes.ADD_POST: {
            const data = action.payload
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
        case PostActionTypes.SET_TOTAL_COUNT: {
            return { ...state, totalCount: action.payload };
        }
        case PostActionTypes.SET_HAS_MORE: {
            return { ...state, hasMore: action.payload };
        }
        case PostActionTypes.SET_LIMIT: {
            return { ...state, limit: action.payload };
        }
        case PostActionTypes.SET_IS_LOADING: {
            return { ...state, isLoading: action.payload };
        }
        default:
            return state;     
    }   
};

// export const setPosts = (posts) => ({type: SET_POSTS, posts});

// export const addPost = (data) => ({type: ADD_POST, data });

// export const setTotalCount = (totalCount) => ({type: SET_TOTAL_COUNT, totalCount})

// export const setHasMore = (hasMore) => ({type: SET_HAS_MORE, hasMore})

// export const setLimit = (limit) => ({type: SET_LIMIT, limit})

// export const setLoading = (isLoading) => ({type: SET_IS_LOADING, isLoading})

export const getPosts = () => {
    return async (dispatch: Dispatch<PostAction>, getState: any) => {
      const state = getState();
      if (state.postsPage.isLoading) return;
      dispatch({type: PostActionTypes.SET_IS_LOADING, payload: true})
      // dispatch(setLoading({type: 'ass', isLoading: true}))
      
      let data = await postsAPI.getPosts(state.postsPage.limit, state.postsPage.posts.length);

      if (state.postsPage.posts.length >= state.postsPage.totalCount) {
        dispatch({type: PostActionTypes.SET_HAS_MORE, payload: false})
        // dispatch(setHasMore(false))
        return
      }
      dispatch({type: PostActionTypes.SET_TOTAL_COUNT, payload: data.total})
      // dispatch(setTotalCount(data.total))
      dispatch({type: PostActionTypes.SET_POSTS, payload: data.items});
      // dispatch(setPosts(data.items));
      dispatch({type: PostActionTypes.SET_IS_LOADING, payload: false})
      // dispatch(setLoading(false))
    };
};

export const publishPost = ({postId, contentfulVersion}: PublishPostPayload) => {
    return async (dispatch: Dispatch<PostAction>) => {
        let response = await postsAPI.publishPost({postId, contentfulVersion});
    }
}

export const createPost = ({title, body} : CreatePostPayload) => {
    return async (dispatch: Dispatch<PostAction>) => {
        let response = await postsAPI.createPost(title, body);
        if (response.status === 201) {
            console.log(response.data)
            dispatch({type: PostActionTypes.PUBLISH_POST, payload: {postId: response.data.sys.id, contentfulVersion: response.data.sys.version}})
            // dispatch(publishPost(response.data.sys.id, response.data.sys.version))
            dispatch({type: PostActionTypes.ADD_POST, payload: response.data})
            // dispatch(addPost(response.data))
        } else {
            console.log('Something went wrong: ', response.data.error)
        }
        
    }
}

export default postsPageReducer;