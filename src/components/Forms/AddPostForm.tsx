import React, { Dispatch, FC } from "react";
import styles from "./AddPostForm.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import { CreatePostPayload, PostAction, PostActionTypes } from "../../types/posts";
import { useActions } from "../../hooks/useActions";

const AddPostForm:FC = () => {
  const { createPost } = useActions()
  let navigate = useNavigate()

  const handlePostSave = ({title, body}: CreatePostPayload) => {
    createPost({title, body})
  };

  const emptyFieldValidation = (value: any) => {
    let error;
    if (value.trim() === "") {
      error = 'Field is required'
    }
    return error
  }

  return (
    <div className={styles.form}>
      <h1>Create new post</h1>
      <Formik
        initialValues={{
          postTitle: "",
          postText: "",
        }}
        onSubmit={async (values) => {
          handlePostSave({title: values.postTitle, body: values.postText})
          navigate('../posts', {replace: true})
        }}
      >
        {({ errors, touched, isValidating }) => (
        <Form>
          <div className={styles.item}>
            <label htmlFor="postTitle" className={styles.titleInputHeader}>Post Title</label>
            <Field
              validate={emptyFieldValidation}
              className={styles.postTitleInput}
              id="postTitle"
              name="postTitle"
              placeholder="How is it going?"
            />
            {errors.postTitle && touched.postTitle && <div className={styles.error}>{errors.postTitle}</div>}
          </div>

          <div className={styles.item}>
            <label htmlFor="postText">Post Text</label>
            <Field
              validate={emptyFieldValidation}
              className={styles.postTextInput}
              as="textarea"
              id="postText"
              name="postText"
              placeholder="Tell us more"
            />
            {errors.postText && touched.postText && <div className={styles.error}>{errors.postText}</div>}
          </div>

          <button className={styles.button} type="submit">Create</button>
          <NavLink to="/posts"><button className={styles.button} type="button">Back to posts</button></NavLink>
          
        </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddPostForm;