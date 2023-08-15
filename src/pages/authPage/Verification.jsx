import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Verification = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  useEffect(() => {
    console.log(query.get("id"));
    verify();
  }, []);
  const verify = async () => {
    try {
      await axios.get(`http://localhost:5000/auth/verify/${query.get("id")}`);
      setShow(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body className="text-center text-warning mb-3">
        <h3>Account has been set up</h3>
      </Modal.Body>
      <p className="text-muted text-center mb-3">Account activated successfully, please login</p>
      <Modal.Footer className="d-flex align-items-center justify-content-center">
        <Button className="text-white w-75 bg-warning border p-2" variant="warning" onClick={() => navigate("/login")}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Verification;
