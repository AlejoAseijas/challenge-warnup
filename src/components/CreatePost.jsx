import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAppContext } from "../context/appContext";

function CreatePost(e) {
  let location = e.match.path;
  let idPost = e.match.params.idPost;
  const { createNewPost, editPost } = useAppContext();
  const [locationTitle, setLocationTitle] = useState(false);

  useEffect(() => {
    if (location === "/edit/post/:idPost") {
      setLocationTitle(true);
    } else if (location === "/new-post/") {
      setLocationTitle(false);
    }
  }, []);

  return (
    <>
      <NavBar />
      <Formik
        initialValues={{
          titlePost: "",
          bodyPost: "",
          userId: "",
        }}
        validate={(data) => {
          let err = {};

          if (!data.titlePost) {
            err.titlePost = "Enter title post";
          }
          if (!data.bodyPost) {
            err.bodyPost = "Enter body post";
          }
          if (locationTitle === false) {
            if (!data.userId) {
              err.userId = "Enter userId";
            } else if (!/^[0-9]+$/.test(data.userId)) {
              err.userId = "Invalid userId, Only numbers";
            }
          }
          return err;
        }}
        onSubmit={(data, { resetForm }) => {
          resetForm();
          if (locationTitle === false) {
            createNewPost(data);
          } else {
            data.userId = idPost;
            editPost(data);
          }
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <div className="container">
            <div className="row justify-content-center mt-3">
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="card shadow">
                  <div className="card-title text-center border-bottom">
                    {locationTitle === false ? (
                      <h2 className="p-3">New Post</h2>
                    ) : (
                      <h2 className="p-3">Edit Post</h2>
                    )}
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
                            <div className="error"> {errors.titlePost} </div>
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
                        {locationTitle === false ? (
                          <div className="mb-4">
                            <label className="form-label">Id</label>
                            <Field
                              type="number"
                              min="101"
                              className="form-control"
                              id="id"
                              name="userId"
                            />
                            <ErrorMessage
                              name="userId"
                              component={() => (
                                <div className="error"> {errors.userId} </div>
                              )}
                            />
                          </div>
                        ) : (
                          <></>
                        )}
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
  );
}

export default CreatePost;
