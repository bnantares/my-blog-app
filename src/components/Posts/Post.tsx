import React, { FC } from "react";
import { IPost } from "../../types/posts";
import styles from "./Post.module.css"

interface PostProps {
    post: IPost;
    key: string
}

const Post: FC<PostProps> = ({ post, key }) => {
    return (
        <div className={styles.post}>
            <p className={styles.post__title}>{ key } { post.title }</p>
            <p className={styles.post__body}>{ post.body }</p>
        </div>
    )
}

export default Post;