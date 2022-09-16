import { FC, useEffect } from "react";
import Post from "./Post";
import styles from "./Posts.module.css"
import InfiniteScroll from "react-infinite-scroller";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useActions } from "../../hooks/useActions";


let PostsWithImportedScroller:FC = () => {
  const { getPosts } = useActions()
  const hasMore = useSelector((state: RootState) => state.postsPage.hasMore)
  const posts = useSelector((state: RootState) => state.postsPage.posts)

  const handleScroll = () => {
    getPosts()
  };

  useEffect(() => {
    getPosts()
  }, []);

  return (
    <div className={styles.postsBlock}>
      <div className={styles.header}>Welcome to the blog with random posts</div>
      <NavLink to="/addpost"><button className={styles.button} type="button">Add new post</button></NavLink>
      <InfiniteScroll
        pageStart={0}
        loadMore={handleScroll}
        hasMore={hasMore}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
        initialLoad={true}
      >
        {posts.map((p) => (
          <Post post={p.fields} key={p.id} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default PostsWithImportedScroller;
