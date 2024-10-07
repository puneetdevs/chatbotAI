import { Formik } from "formik";
import React from "react";
import Modal from "react-bootstrap/Modal";
import * as Yup from "yup";

function Workspace(props) {
  const { show, handleClose, setPayload } = props;
  return (
    <Modal show={show} onHide={handleClose} centered className="sharebot-modal">
      <Modal.Header closeButton>
        <Modal.Title>Create Workspace</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-0">
        <Formik
          initialValues={{
            title: "",
            description: "",
            message: "",
          }}
          validationSchema={Yup.object({
            title: Yup.string().required("Title is required"),
            description: Yup.string(),
            message: Yup.string(),
          })}
          onSubmit={(values) => {
            setPayload(values);
          }}
        >
          {({ values, handleChange, handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={values.name}
                  onChange={handleChange}
                />
                {errors.title && touched.title && (
                  <div className="text-danger">{errors.title}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                />
                {errors.description && touched.description && (
                  <div className="text-danger">{errors.description}</div>
                )}
              </div>
              {/* <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Welcome Message
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                />
                {errors.message && touched.message && (
                  <div className="text-danger">{errors.message}</div>
                )}
              </div> */}
              <div className="d-flex mt-3 justify-content-end">
                <button type="submit" className="btn btn-primary mt-2">
                  Create
                </button>
              </div>
            </form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default Workspace;
