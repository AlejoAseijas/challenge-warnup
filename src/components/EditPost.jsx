import React from "react";
import NavBar from "./NavBar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAppContext } from "../context/appContext";
import { render } from "@testing-library/react";

function EditPost(loc) {
  let idPost = loc.match.params.idPost;
  const { editPost, posts } = useAppContext();
  const dataPost = posts.find((dataPost) => {
    return dataPost.id == idPost;
  });

  return (
    <>
      {dataPost === undefined ? (
        <div className="d-flex justify-content-center border border-center">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        <>
          <NavBar />
          <Formik
            initialValues={{
              titlePost: dataPost.title,
              bodyPost: dataPost.body,
            }}
            validate={(data) => {
              let err = {};

              if (!data.titlePost) {
                err.titlePost = "Enter title post";
              }
              if (!data.bodyPost) {
                err.bodyPost = "Enter body post";
              }

              return err;
            }}
            onSubmit={(data, { resetForm }) => {
              resetForm();
              data.userId = dataPost.userId;
              editPost(data, idPost);
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <div className="container">
                <div className="row justify-content-center mt-3">
                  <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="card shadow">
                      <div className="card-title text-center border-bottom">
                        <h2 className="p-3">Edit Post</h2>
                      </div>
                      <div className="card-body">
                        <Form>
                          <div className="mb-4">
                            <label className="form-label">Title Post</label>
                            <Field
                              type="text"
                              className="form-control"
                              id="title"
                              name="titlePost"
                            />
                            <ErrorMessage
                              name="titlePost"
                              component={() => (
                                <div className="error">{errors.titlePost}</div>
                              )}
                            />
                          </div>
                          <div className="mb-4">
                            <label className="form-label">Post</label>
                            <Field
                              as="textarea"
                              className="form-control"
                              id="body"
                              name="bodyPost"
                            />
                            <ErrorMessage
                              name="bodyPost"
                              component={() => (
                                <div className="error"> {errors.bodyPost} </div>
                              )}
                            />
                          </div>
                          <div className="d-grid">
                            <button
                              type="submit"
                              className="btn btn-primary text-light"
                            >
                              Submit Post
                            </button>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Formik>
        </>
      )}
    </>
  );
}

export default EditPost;
