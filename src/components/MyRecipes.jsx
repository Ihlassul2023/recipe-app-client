import React, { useEffect, useState } from "react";
import { instance } from "../utils/serviceApi";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteMenu } from "../redux/action/menu";
import { useDispatch, useSelector } from "react-redux";

const MyRecipes = ({ myMenu, getMyRecipe }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [flag, setFlag] = useState(false);
  const [nameMenu, setNameMenu] = useState({
    name: "",
    id: "",
  });
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.delete_menuReducer);
  const handleShow = (name, id) => {
    setShow(true);
    setNameMenu({ ...nameMenu, name, id });
  };
  useEffect(() => {
    !isLoading && setShow(false);
    setFlag(false);
  }, [isLoading]);
  const handleClose = () => setShow(false);

  const handleDelete = async (id) => {
    dispatch(deleteMenu(id));
    setFlag(true);
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>Ingin menghapus {nameMenu.name}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tidak
          </Button>
          <Button variant="warning" onClick={() => handleDelete(nameMenu.id)}>
            {isLoading ? (
              <Spinner animation="border" size="sm" variant="light" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              "Ya"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      {myMenu != null &&
        myMenu.map((menu) => (
          <div key={menu.id} className="listRecipe row mb-4">
            <div className="listRecipeImage col-md-4">
              <img style={{ height: "300px", width: "350px", objectFit: "cover" }} loading="lazy" src={menu.photo} alt="gambar" />
            </div>
            <div className="listRecipeExp col-md-4 d-flex flex-column gap-4">
              <h3 className="text-dark">{menu.title}</h3>
              <p className="w-50">{menu.ingredients}</p>
              <button className="buttonSection2">
                <Link to={`/detailRecipe/${menu.id}`}>
                  {menu.like_count} Likes - {menu.comment_count} Comment - {menu.saved_count} Bookmark
                </Link>
              </button>
              <div className="profile btnDetailProfile d-flex align-items-center gap-5">
                <button onClick={() => navigate(`/addRecipe/${menu.id}`)}>Edit Menu</button>
                <button onClick={() => handleShow(menu.title, menu.id)}>Delete Menu</button>
              </div>
            </div>
          </div>
        ))}
      <ToastContainer />
    </>
  );
};

export default MyRecipes;
