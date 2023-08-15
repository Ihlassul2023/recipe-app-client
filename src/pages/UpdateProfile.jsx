import React, { useEffect, useState } from "react";
import profl from "../assets/images/Ellipse 129.png";
import { Spinner } from "react-bootstrap";
import { Navbar } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/action/auth";
import { ToastContainer } from "react-toastify";

const UpdateProfile = () => {
  const [photo, setPhoto] = useState(null);
  const dispatch = useDispatch();
  const [dataUser, setDataUser] = useState({
    name: localStorage.getItem("name"),
    email: localStorage.getItem("email"),
    photo_user: localStorage.getItem("photo"),
    photoUrl: "",
  });
  const { isLoading } = useSelector((state) => state.updateUser);
  const handleInput = (e) => {
    const { value, name } = e.target;
    setDataUser({ ...dataUser, [name]: value });
  };
  const handlePhoto = (e) => {
    setPhoto(e.target.files[0]);
    setDataUser({ ...dataUser, photoUrl: URL.createObjectURL(e.target.files[0]) });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(dataUser, photo);
    let bodyFormData = new FormData();
    bodyFormData.append("name", dataUser.name);
    bodyFormData.append("email", dataUser.email);
    bodyFormData.append("photo_user", photo);
    dispatch(updateUser(bodyFormData));
  };
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main>
        <div className="distanceNav container mt-5">
          <div className="row justify-content-center align-items-center mb-5">
            <div className="col-8 editProfil d-flex flex-column align-items-center justify-content-center gap-5">
              <div className="editImg d-flex align-items-center gap-2 flex-column">
                <img src={dataUser.photoUrl || dataUser.photo_user || profl} style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }} alt="gambar" />
                <label className="text-decoration-none" htmlFor="photo">
                  Change Profile picture
                </label>
                <input className="d-none" type="file" onChange={handlePhoto} name="photo_user" id="photo" />
              </div>
              <form onSubmit={handleSubmit} className="w-50">
                <div className="input d-flex w-100 flex-column gap-2 mb-4">
                  <label className="text-muted" htmlFor="name">
                    Name
                  </label>
                  <input value={dataUser.name} name="name" className="p-3 rounded border-1" type="text" onChange={handleInput} placeholder="Name" />
                </div>
                <div className="input d-flex w-100 flex-column gap-2 mb-4">
                  <label className="text-muted" htmlFor="name">
                    Email
                  </label>
                  <input value={dataUser.email} name="email" onChange={handleInput} className="p-3 rounded border-1" type="email" placeholder="email" />
                </div>
                <button className="p-3 w-100 bg-warning rounded border-0 text-white mb-3">
                  {isLoading ? (
                    <Spinner animation="border" role="status" size="sm" variant="light">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : (
                    "Update Profile"
                  )}
                </button>
                <span className="w-100">
                  Change Password?<span className="text-warning">Click Here</span>
                </span>
              </form>
            </div>
          </div>
        </div>
      </main>
      <ToastContainer />
    </>
  );
};

export default UpdateProfile;
