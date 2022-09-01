import { type } from "@testing-library/user-event/dist/type"

export interface PostsState {
    posts: any[]
    totalCount: number,
    hasMore: boolean,
    limit: number,
    isLoading: boolean,
}

export enum PostActionTypes {
	SET_POSTS = "SET_POSTS",
    SET_TOTAL_COUNT = "SET_TOTAL_COUNT",
    SET_HAS_MORE = "SET_HAS_MORE",
    SET_LIMIT = "SET_LIMIT",
    SET_IS_LOADING = "SET_IS_LOADING",
    ADD_POST = "ADD_POST",
    PUBLISH_POST = "PUBLISH_POST"
}

interface SetPostsAction {
    type: PostActionTypes.SET_POSTS
    payload: any
}

interface SetTotalCountAction {
    type: PostActionTypes.SET_TOTAL_COUNT
    payload: number
}

interface SetHasMoreAction {
    type: PostActionTypes.SET_HAS_MORE
    payload: boolean
}

interface SetLimitAction {
    type: PostActionTypes.SET_LIMIT
    payload: number
}

interface SetIsLoadingAction {
    type: PostActionTypes.SET_IS_LOADING
    payload: boolean
}

interface AddPostAction {
    type: PostActionTypes.ADD_POST
    payload: any
}

interface PublishPostAction {
    type: PostActionTypes.PUBLISH_POST
    payload: any
}

export type PostAction =
        | SetPostsAction
        | SetTotalCountAction
        | SetHasMoreAction
        | SetLimitAction
        | SetIsLoadingAction
        | AddPostAction
        | PublishPostAction