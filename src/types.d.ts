declare module "*.module.css";
declare type Nullable<T> = T | null


declare interface PostState {
    posts: any[]
    totalCount: number,
    hasMore: boolean,
    limit: number,
    isLoading: boolean,
}

declare interface AppState {
	posts: PostState
	login: LoginState
}

declare interface RootState {
    postsPage: any;
    posts: any[]
    totalCount: number,
    hasMore: boolean,
    limit: number,
    isLoading: boolean,
  }