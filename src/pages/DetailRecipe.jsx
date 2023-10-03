import { Navbar, Footer } from "../components";
import profil from "../assets/images/profil.png";
import saved from "../assets/images/saved.png";
import liked from "../assets/images/liked.png";
import save from "../assets/images/save.png";
import like from "../assets/images/like.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getMenuDetail } from "../redux/action/menu";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getLike, postLike, getSave, postSave } from "../redux/action/likeSave";
import { postComment, getComment } from "../redux/action/comment";
import { useState, useEffect } from "react";
const DetailRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [customComment, setCustomComment] = useState("");
  const [comments, setComments] = useState(null);
  const detailMenu = useSelector((state) => state.detail_menuReducer);
  const dataLike = useSelector((state) => state.getLikeReducer);
  const dataSave = useSelector((state) => state.getSaveReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    getRecipe();
    getDataLikeSave();
  }, []);
  useEffect(() => {
    !detailMenu.isLoading && setRecipe(detailMenu.data?.data);
    !detailMenu.isLoading && setComments(detailMenu.data?.comment);
    console.log(detailMenu.data?.comment);
  }, [detailMenu.isLoading]);
  const getRecipe = async () => {
    dispatch(getMenuDetail(id));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postComment(customComment, id));
  };
  const getDataLikeSave = () => {
    dispatch(getLike());
    dispatch(getSave());
  };
  const likeHandle = () => {
    dispatch(postLike(id));
  };
  const saveHandle = () => {
    dispatch(postSave(id));
  };
  const checkLike = () => {
    let isLiked = dataLike.data?.filter((like) => like.recipe_id == id);
    return isLiked.length > 0;
  };
  const checkSave = () => {
    let isSaved = dataSave.data?.filter((save) => save.recipe_id == id);
    return isSaved.length > 0;
  };
  const options = { day: "2-digit", month: "long", year: "numeric" };
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main>
        <section className="distanceNav mb-5">
          <article>
            <div className="container">
              <div className="sectionDetailRecipe1 row justify-content-between">
                <div className="pictSectionDetail1 col-4 d-flex align-items-center justify-content-center">
                  <div className="profile d-flex align-items-center gap-4">
                    <div className="profilPict h-100 d-flex align-items-center gap-2">
                      <div className="line" />
                      <img
                        style={{
                          width: "70px",
                          height: "70px",
                          objectFit: "cover",
                        }}
                        className="rounded-circle"
                        src={recipe?.photo_user}
                        alt="profil"
                      />
                    </div>
                    <div className="profileNameLogout d-flex flex-column">
                      <span>{recipe?.author}</span>
                    </div>
                  </div>
                </div>
                <div className="historySectionDetail1 col-3">
                  <span className="text-dark">{new Date(recipe?.created_at).toLocaleDateString("id-ID", options)}</span>
                  <br />
                  <span className="text-dark">
                    {recipe?.like_count} Likes - {recipe?.comment_count} Comments
                  </span>
                </div>
              </div>
            </div>
          </article>
        </section>
        <section className="mb-5">
          <article>
            <div className="container">
              <div key={recipe?.id} className="row justify-content-center">
                <div className="col-12 d-flex flex-column align-items-center gap-3">
                  <h1 className="text-dark">{recipe?.title}</h1>
                  <img className="pictSectionDetail2 w-50 h-50" src={recipe?.photo} alt="gambar" />
                  <div className="ingredients mt-3 w-100">
                    <h3 className="text-dark">Ingredients</h3>
                    <ul>
                      {recipe?.ingredients.split(",").map((item) => (
                        <li className="text-dark">{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="action d-flex align-items-center w-100 gap-3">
                    {dataLike.data != null && checkLike() ? (
                      <img style={{ cursor: "pointer" }} onClick={likeHandle} src={liked} height="30px" width="30px" alt="gambar" />
                    ) : (
                      <img style={{ cursor: "pointer" }} src={like} onClick={likeHandle} height="30px" width="30px" alt="gambar" />
                    )}
                    {dataSave.data != null && checkSave() ? (
                      <img style={{ cursor: "pointer" }} onClick={saveHandle} src={saved} height="30px" width="30px" alt="gambar" />
                    ) : (
                      <img style={{ cursor: "pointer" }} src={save} onClick={saveHandle} height="30px" width="30px" alt="gambar" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </article>
        </section>
        <section className="mb-5">
          <article>
            <div className="container">
              {comments != null &&
                comments?.map((comment, index) => (
                  <div key={index} className="row mb-4">
                    <div className="lineUp mb-3" />
                    <div className="sectionDetailRecipe3 col-8 d-flex align-items-center justify-content-start">
                      <div className="profile d-flex align-items-center gap-4">
                        <div className="profilPict h-100 d-flex align-items-center gap-2">
                          <img
                            style={{
                              width: "70px",
                              height: "70px",
                              objectFit: "cover",
                            }}
                            className="rounded-circle"
                            src={comment.photo_user}
                            alt="profil"
                          />
                        </div>
                        <div className="profileNameLogout d-flex flex-column">
                          <span>{comment.name}</span>
                        </div>
                        <div className="line" />
                        <span className="text-dark">{comment.text}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </article>
        </section>
        <section>
          <article>
            <div className="container">
              <div className="row">
                <div className="col-8 sectioDetailRecipe4 d-flex flex-column gap-3">
                  <input className="inputComment" placeholder="Your comment here!" type="text" value={customComment} onChange={(e) => setCustomComment(e.target.value)} />
                  <button onClick={handleSubmit} className="btnComment">
                    Send a comment
                  </button>
                </div>
              </div>
            </div>
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

export default DetailRecipe;
