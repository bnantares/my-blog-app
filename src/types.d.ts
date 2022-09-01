declare type Nullable<T> = T | null

declare interface PostState {
    posts: any[]
    totalCount: number,
    hasMore: boolean,
    limit: number,
    isLoading: boolean,
	// map: any
	// items: string[]
	// loading: boolean
	// error: Nullable<string>
	// total: Nullable<number>
}

declare interface AppState {
	posts: PostState
	login: LoginState
}