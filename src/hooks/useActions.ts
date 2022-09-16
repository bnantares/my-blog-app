import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as PostsActionCreators from '../redux/postsPage-reducer'

export const useActions = () => {
	const dispatch = useDispatch()

	return bindActionCreators(PostsActionCreators, dispatch)
}