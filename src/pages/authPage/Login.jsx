import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/action/auth";
import { ToastContainer, toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [dataInput, setDataInput] = useState({
    email: "",
    password: "",
  });
  const { isLoading } = useSelector((state) => state.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleInput = (e) => {
    const { value, name } = e.target;
    setDataInput({ ...dataInput, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(dataInput, navigate));
  };
  return (
    <>
      <div className="containerAuth">
        <div className="containerForm">
          <h1>Recipe...</h1>
          <div className="mainForm">
            <div className="expForm">
              <h1>Welcome</h1>
              <p>Log in into your exiting account</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="input">
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Email" value={dataInput.email} onChange={(e) => handleInput(e)} name="email" />
              </div>
              <div className="input">
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" value={dataInput.password} onChange={(e) => handleInput(e)} name="password" />
              </div>
              <div className="check">
                <input type="checkbox" name="check" id="check" />
                <label htmlFor="check">I agree to terms &amp; conditions</label>
              </div>
              <button>
                {isLoading ? (
                  <Spinner animation="border" size="sm" variant="light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </div>
          <div className="alreadyRegister">
            <p>
              Don’t have an account?{" "}
              <Link to="/register">
                <span>Sign Up</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
