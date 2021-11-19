import React from "react";
import NavBar from "./NavBar";
import Axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAppContext } from "../context/appContext";

function CreatePost() {
  const { posts, setPosts } = useAppContext();

  const newPostWrite = async (data) => {
    let id = parseInt(data.userId);
    const res = await Axios.post(
      "https://httpbin.org/post",
      {
        title: data.titlePost,
        body: data.bodyPost,
        userId: id,
      },
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    let dataPost = JSON.parse(res.data.data);
    dataPost.id = dataPost.userId;
    setPosts([...posts, dataPost]);
    alert("Post Creado");
  };

  return (
    <>
      <NavBar />
      <Formik
        initialValues={{
          titlePost: "",
          bodyPost: "",
          userId: "",
        }}
        onSubmit={(data, { resetForm }) => {
          resetForm();
          newPostWrite(data);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <div className="container">
            <div className="row justify-content-center mt-3">
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="card shadow">
                  <div className="card-title text-center border-bottom">
                    <h2 className="p-3">New Post</h2>
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
                        <div className="mb-4">
                          <label className="form-label">Id</label>
                          <Field
                            type="text"
                            className="form-control"
                            id="id"
                            name="userId"
                          />
                        </div>
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
