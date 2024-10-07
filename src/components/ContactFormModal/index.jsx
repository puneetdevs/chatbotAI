import React, { useState } from "react";
import ModalComponent from "../Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";
import axios from "axios";

const ContactFormModal = () => {
  const [show, setShow] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_WEBHOOK_URL}`,
        values
      );
      toast.success("Form submitted successfully!");
      setShow(false);

      // Optionally, close the modal or reset the form here
    } catch (error) {
      toast.success(" Error submitting form!");
    }
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={() => setShow(true)}
        className="bg-transparent px-0 py-0 border-none"
      >
        Contact Us
      </Button>
      <ModalComponent
        handleClose={setShow}
        show={show}
        ModalHeading="Get in Touch"
        ModalBody={
          <Formik
            initialValues={{
              name: "",
              email: "",
              phone: "",
              message: "",
            }}
            validationSchema={Yup.object({
              name: Yup.string().required("Name is required"),
              phone: Yup.string()
                .matches(/^[0-9]{10}$/, "Invalid phone number")
                .required("Phone number is required"),
              email: Yup.string()
                .email("Invalid email")
                .required("Email is required"),
              message: Yup.string().required("Message is required"),
            })}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                {" "}
                {/* Add onSubmit handler to Formik form */}
                <Form.Group
                  className="mb-4 relative"
                  controlId="exampleForm.Name"
                >
                  <Form.Label className="text-xs">Name</Form.Label>
                  <Field
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter your name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-xs absolute bottom-0 mb-[-1rem] left-1"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-4 relative"
                  controlId="exampleForm.Email"
                >
                  <Form.Label className="text-xs">Email address</Form.Label>
                  <Field
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-xs absolute bottom-0 mb-[-1rem] left-1"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-4 relative"
                  controlId="exampleForm.Phone"
                >
                  <Form.Label className="text-xs">Phone Number</Form.Label>
                  <Field
                    type="number"
                    name="phone"
                    className="form-control"
                    placeholder="Enter your phone number"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-xs absolute bottom-0 mb-[-1rem] left-1"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-4 relative"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label className="text-xs">Message</Form.Label>
                  <Field
                    as="textarea"
                    name="message"
                    className="form-control"
                    rows={3}
                    placeholder="Enter your message"
                  />
                </Form.Group>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="submitBtn text-lg bg-violet-700 px-6 py-2.5 group inline-flex cursor-pointer items-center justify-center gap-4 rounded-full   transition-colors delay-75 h-14  text-white  active:bg-transparent focus:outline-none focus:ring focus:ring-violet"
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        }
      />
    </>
  );
};

export default ContactFormModal;
