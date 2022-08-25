import React from "react";
import styles from "./Post.module.css"

const Post = ({ post, index }) => {
    return (
        <div className={styles.postBlock}>
            <p className={styles.title}>{index} { post.title }</p>
            <p>{ post.body}</p>
        </div>
    )
}

export default Post;