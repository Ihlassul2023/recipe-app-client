import React, { useEffect, useState } from "react";
import { Navbar, Footer } from "../components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router";
import loading from "../assets/images/loading.png";
import { postMenu, updateMenu, getMenuDetail } from "../redux/action/menu";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

const AddRecipe = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [data, setData] = useState({
    title: "",
    ingredients: "",
    category_id: "1",
    photo_url: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { post_menuReducer, put_menuReducer, detail_menuReducer } = useSelector((state) => state);
  useEffect(() => {
    id && getData();
  }, [id]);
  useEffect(() => {
    !detail_menuReducer.isLoading && setData({ ...data, ...detail_menuReducer.data });
  }, [detail_menuReducer.isLoading]);
  const getData = async () => {
    dispatch(getMenuDetail(id));
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const onChangePhoto = (e) => {
    setPhoto(e.target.files[0]);
    setData({ ...data, photo_url: URL.createObjectURL(e.target.files[0]) });
    document.getElementById("close2").classList.remove("d-none");
  };
  const removePhoto = () => {
    setPhoto(null);
    setData({ ...data, photo_url: "", photo: null });
    document.getElementById("close2").classList.add("d-none");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let bodyFormData = new FormData();
    bodyFormData.append("title", data.title);
    bodyFormData.append("ingredients", data.ingredients);
    bodyFormData.append("category_id", data.category_id);
    bodyFormData.append("photo", photo);
    !id ? dispatch(postMenu(bodyFormData)) : dispatch(updateMenu(bodyFormData, id));
  };
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main>
        <section className="distanceNav mt-5">
          <article>
            {detail_menuReducer.isLoading ? (
              <div className="loading-container">
                <img className="loading-image" src={loading} alt="Image 1" />
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="container addRecipe">
                  <div className="row justify-content-center mb-3">
                    <div className="col-8">
                      <label onClick={removePhoto} id="close2" className="d-none">
                        <span className="material-symbols-outlined">close</span>
                      </label>
                      <label
                        htmlFor="file"
                        style={{
                          backgroundImage: `url(${data.photo_url || data?.photo})`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          height: "300px",
                        }}
                        className="sectionAddRecipePhoto w-100 d-flex justify-content-center align-items-center"
                      >
                        Add Photo
                      </label>
                      <input className="d-none" type="file" onChange={onChangePhoto} name="photo" id="file" />
                    </div>
                  </div>
                  <div className="row justify-content-center mb-3">
                    <div className="col-8">
                      <input className="sectionAddRecipeTitle w-100" value={data.title} onChange={handleInput} name="title" placeholder="Title" type="text" />
                    </div>
                  </div>
                  <div className="row justify-content-center mb-5">
                    <div className="col-8">
                      <textarea className="sectionAddRecipeIngredients w-100 mb-3" name="ingredients" value={data.ingredients} onChange={handleInput} placeholder="Ingredients" />
                      <select onChange={handleInput} className="sectionAddRecipeCategory" name="category_id">
                        <option value="1">Main course</option>
                        <option value="2">Dessert</option>
                        <option value="3">Appetizer</option>
                      </select>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-4">
                      {id ? (
                        <button className="buttonAddRecipe w-100">
                          {put_menuReducer.isLoading ? (
                            <Spinner animation="border" role="status" size="sm" variant="light">
                              <span className="visually-hidden">Loading...</span>
                            </Spinner>
                          ) : (
                            "Edit"
                          )}
                        </button>
                      ) : (
                        <button className="buttonAddRecipe w-100">
                          {post_menuReducer.isLoading ? (
                            <Spinner animation="border" role="status" size="sm" variant="light">
                              <span className="visually-hidden">Loading...</span>
                            </Spinner>
                          ) : (
                            "Post"
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            )}
          </article>
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
      <ToastContainer />
    </>
  );
};

export default AddRecipe;
