import { FC } from "react";
import styles from "./AddPostForm.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import { CreatePostPayload } from "../../types/posts";
import { useActions } from "../../hooks/useActions";

const AddPostNewForm:FC = () => {
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
      <div className={styles.form__header}>
      <NavLink to="/posts">
        <button className={styles.back__to__posts__button} type="button">
          <img className="back__to__posts__button__image" src="images/image 51.svg" alt=""></img>
	  		  <span className="back__to__posts__button__text">Back to posts</span>
        </button>
      </NavLink>
	  	<button className={styles.switch__theme__button}>
	  		<img src="images/image2.svg" alt="Change theme"></img>
	  	</button>
	  </div>
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
        <div className={styles.form__body}>   
          <Form className={styles.form__elements}>
              <Field
                validate={emptyFieldValidation}
                className={styles.title}
                id="postTitle"
                name="postTitle"
                placeholder="Hows it going?"
              />
              {errors.postTitle && touched.postTitle && <div className={styles.error}>{errors.postTitle}</div>}
              <Field
                validate={emptyFieldValidation}
                className={styles.textarea}
                as="textarea"
                id="postText"
                name="postText"
                placeholder="Tell us more"
              />
              {errors.postText && touched.postText && <div className={styles.error}>{errors.postText}</div>}
            <div className={styles.footer__buttons}>
            <button type="button" className={styles.addition__file__button}>
						  <img className={styles.button__staple} src="images/staple.svg"></img>
					  </button>
            <button className={styles.submit__button} type="submit" value="Publish">Publish</button>
            </div>
          </Form>
        </div> 
        )}
      </Formik>
    </div>
  );
};

export default AddPostNewForm;
