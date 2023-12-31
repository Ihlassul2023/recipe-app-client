import React from "react";
import sectionSearchMenu from "../assets/images/section-searchMenu.png";
import { Link } from "react-router-dom";
import { postSave } from "../redux/action/likeSave";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyBookmarked = ({ savedRecipe }) => {
  const dispatch = useDispatch();
  const saveHandle = (id) => {
    dispatch(postSave(id));
  };
  return (
    <>
      {savedRecipe != null &&
        savedRecipe.map((item) => (
          <div key={item.id} className="listRecipe row mb-4">
            <div className="listRecipeImage col-4">
              <img style={{ height: "300px", width: "350px", objectFit: "cover" }} src={item.photo} alt="gambar" />
            </div>
            <div className="listRecipeExp col-4 d-flex flex-column gap-4">
              <h3 className="text-dark">{item.title}</h3>
              <p className="w-50">{item.ingredients}</p>
              <button className="buttonSection2">
                <Link to={`/detailRecipe/${item.recipe_id}`}>
                  {item.like_count} Likes - {item.comment_count} Comment - {item.saved_count} Bookmark
                </Link>
              </button>
              <div className="profile btnDetailProfile d-flex flex-column-reverse align-items-start gap-5">
                <div />
                <button onClick={() => saveHandle(item.recipe_id)} className="w-75">
                  Delete From Bookmark
                </button>
              </div>
            </div>
          </div>
        ))}
      <ToastContainer />
    </>
  );
};

export default MyBookmarked;
