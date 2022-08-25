import React, { useEffect } from "react";
import Post from "./Post";
import styles from "./Posts.module.css"
import InfiniteScroll from "react-infinite-scroller";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../../redux/postsPage-reducer'

let PostsWithImportedScroller = () => {
  const dispatch = useDispatch();
  const hasMore = useSelector(state => state.postsPage.hasMore)
  const posts = useSelector(state => state.postsPage.posts)

  const handleScroll = () => {
    dispatch(getPosts())
  };

  useEffect(() => {
    dispatch(getPosts());
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
