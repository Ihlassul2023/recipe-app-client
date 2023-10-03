import { Link } from "react-router-dom";
import { Button, Modal, Spinner } from "react-bootstrap";
import "./auth.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/action/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [show, setShow] = useState(false);
  const { data, isLoading, isError, errorMessage } = useSelector((state) => state.register);
  const handleClose = () => setShow(false);
  const dispatch = useDispatch();
  const [check, setCheck] = useState(true);
  const [dataInput, setDataInput] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  useEffect(() => {
    !isLoading && isError && toast.error(errorMessage);
    data && !isLoading && !isError && setShow(true);
  }, [isLoading]);
  const handleInput = (e) => {
    const { value, name } = e.target;
    setDataInput({ ...dataInput, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(dataInput);
    dispatch(register(dataInput));
  };
  return (
    <>
      <div className="containerAuth">
        <Modal show={show} onHide={handleClose}>
          <Modal.Body className="text-center text-warning mb-3">
            <h3>You're all set!</h3>
          </Modal.Body>
          <p className="text-muted text-center mb-3">Please check your email account for verification</p>
          <Modal.Footer className="d-flex align-items-center justify-content-center">
            <Button className="text-white w-75 bg-warning border p-2" variant="warning" onClick={handleClose}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="containerForm">
          <h1>Recipe...</h1>
          <div className="mainForm">
            <div className="expForm">
              <h1>Let's Get Started</h1>
              <p>Create new account to access all features</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="input">
                <label htmlFor="name">Name</label>
                <input type="text" value={dataInput.name} onChange={(e) => handleInput(e)} placeholder="Name" name="name" required />
              </div>
              <div className="input">
                <label htmlFor="email">Email</label>
                <input type="email" value={dataInput.email} onChange={(e) => handleInput(e)} placeholder="Email" name="email" required />
              </div>
              <div className="input">
                <label htmlFor="phone">Phone Number</label>
                <input type="text" value={dataInput.phone} onChange={(e) => handleInput(e)} placeholder="Phone Number" name="phone" required />
              </div>
              <div className="input">
                <label htmlFor="password">Password</label>
                <input type="password" value={dataInput.password} onChange={(e) => handleInput(e)} placeholder="Password" name="password" required />
              </div>
              <div className="check">
                <input onClick={() => setCheck(!check)} style={{ marginRight: "10px" }} type="checkbox" name="check" id="check" />
                <label htmlFor="check">I agree to terms &amp; conditions</label>
              </div>
              <button disabled={check} className="w-100 text-white bg-warning border-0 p-2 text-decoration-none">
                {isLoading ? (
                  <Spinner animation="border" role="status" size="sm" variant="light">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  "Register Account"
                )}
              </button>
            </form>
            {/* modal notif */}
          </div>
          <div className="alreadyRegister">
            <p>
              Already have account?{" "}
              <Link to="/login">
                <span>Log in Here</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
