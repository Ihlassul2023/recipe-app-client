import React from "react";

const Footer = () => {
  return (
    <div className="container-fluid footer d-flex flex-column">
      <div className="expFooter flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <h1>Eat, Cook, Repeat</h1>
        <p>Share your best recipe by uploading here !</p>
      </div>
      <div className="nav-footer position-relative d-flex">
        <div className="nav flex-grow-1 d-flex gap-4 justify-content-center">
          <a href="#">Product</a>
          <a href="#">Company</a>
          <a href="#">Learn More</a>
          <a href="#">Get In Touch</a>
        </div>
        <p className="arkademy position-absolute">© Arkademy</p>
      </div>
    </div>
  );
};

export default Footer;
