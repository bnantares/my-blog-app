import React, { FC } from "react";
import { IPost } from "../../types/posts";
import styles from "./Post.module.css"

interface PostProps {
    post: IPost;
    key: string
}

const Post: FC<PostProps> = ({ post, key }) => {
    return (
        <div className={styles.postBlock}>
            <p className={styles.title}>{key} { post.title }</p>
            <p>{ post.body}</p>
        </div>
    )
}

export default Post;