import { FC, useEffect } from "react";
import Post from "./Post";
import styles from "./Posts.module.css"
import InfiniteScroll from "react-infinite-scroller";
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
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
      <div className={styles.header}>
		    <button className={styles.header__all_posts_tag}>All posts</button>
		    <button className={styles.header__switch_theme_button}><img src="images/image2.svg" alt="Switch theme"></img></button>
	    </div>
      <NavLink to="/addpost">
        <button className={styles.footer__add_post_button}>
            
		        <img className={styles.image} src="images/Vector.svg" alt=""></img>
		        <span className={styles.text}>New post</span>
            
	      </button>
      </NavLink>
      <div className={styles.posts}>
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
    </div>
  );
};

export default PostsWithImportedScroller;
