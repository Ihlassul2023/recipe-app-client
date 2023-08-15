import React from "react";
import { Link, useNavigate } from "react-router-dom";
import profil from "../assets/images/profil.png";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("photo");
    navigate("/login");
  };
  return (
    <div className="container-fluid position-relative">
      <div className="navWraper align-items-center row justify-content-between">
        <div className="col-4 navigationSearch">
          <label htmlFor="checkBox" className="d-none close">
            <span className="material-symbols-outlined">close </span>
          </label>
          <Link to={"/"}>Home</Link>
          {token ? (
            <>
              <Link to={"/addRecipe"}>Add Menu</Link>
            </>
          ) : (
            <>
              <Link to={"/register"}>Register</Link>
            </>
          )}
          <Link to={"/searchMenu?search&page"}>Search Menu</Link>
        </div>
        {token ? (
          <div className="navPict col-4 d-flex align-items-center justify-content-center">
            <div className="profile d-flex align-items-center gap-4">
              <div className="profilPict h-100 d-flex align-items-center gap-2">
                <div className="line" />
                {localStorage.getItem("photo") != "null" ? (
                  <img
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                    }}
                    className="rounded-circle"
                    src={localStorage.getItem("photo")}
                    alt="profil"
                  />
                ) : (
                  <img className="w-100 h-100" src={profil} alt="profil" />
                )}
              </div>
              <div className="profileNameLogout d-flex flex-column">
                <span>
                  <Link className="text-decoration-none" to={"/detailProfile"}>
                    {name}
                  </Link>
                </span>
                <span onClick={handleLogout} className="fw-bolder text-dark pointer-event">
                  Logout
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="navPict col-4 d-flex align-items-center justify-content-center">
            <div className="profile d-flex align-items-center gap-4">
              <div className="profilPict h-100 d-flex align-items-center gap-2">
                <div className="line" />
                <img style={{ width: "50px", height: "50px", borderRadius: "50%" }} src={profil} alt="profil" />
              </div>
              <div className="profileNameLogout d-flex flex-column">
                <span>
                  <Link className="text-decoration-none" to={"/login"}>
                    Login
                  </Link>
                </span>
              </div>
            </div>
          </div>
        )}
        <div className="col-4 menuBurger d-none">
          <label htmlFor="checkBox">
            <span className="material-symbols-outlined"> menu </span>
          </label>
          <input className="toggle-navbar d-none" type="checkbox" id="checkBox" name="checkBox" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
