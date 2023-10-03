import React, { useEffect, useState } from "react";
import { Navbar, Footer, MyRecipes, MyBookmarked } from "../components";
import profil from "../assets/images/profil.png";
import { Link } from "react-router-dom";
import loading from "../assets/images/loading.png";
import { useDispatch, useSelector } from "react-redux";
import { getMyMenu } from "../redux/action/menu";
import { getSave, getLike } from "../redux/action/likeSave";
import MyLikedRecipe from "../components/MyLikedRecipe";

const DetailProfile = () => {
  const [moveRecipe, setMoveRecipe] = useState(true);
  const [moveBookmark, setMoveBookmark] = useState(false);
  const [moveLike, setMoveLike] = useState(false);
  const [myMenu, setMyMenu] = useState(null);
  const [savedRecipe, setSavedRecipe] = useState(null);
  const [likedRecipe, setLikedRecipe] = useState(null);
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.myMenu_Reducer);
  const bookmarkRecipe = useSelector((state) => state.getSaveReducer);
  const likeRecipe = useSelector((state) => state.getLikeReducer);
  useEffect(() => {
    getMyRecipe();
  }, []);
  useEffect(() => {
    !isLoading && setMyMenu(data);
    !bookmarkRecipe.isLoading && setSavedRecipe(bookmarkRecipe.data);
    !likeRecipe.isLoading && setLikedRecipe(likeRecipe.data);
  }, [isLoading, bookmarkRecipe.isLoading, likeRecipe.isLoading]);

  const getMyRecipe = () => {
    dispatch(getMyMenu());
    dispatch(getSave());
    dispatch(getLike());
  };
  const options = { day: "2-digit", month: "long", year: "numeric" };
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main>
        {isLoading ? (
          <div className="loading-container">
            <img className="loading-image" src={loading} alt="Image 1" />
          </div>
        ) : (
          <>
            <section className="distanceNav">
              <article>
                <div className="container">
                  <div className="sectionDetailRecipe1 row justify-content-between mb-5">
                    <div className="pictSectionDetail1 col-4 d-flex align-items-center justify-content-center">
                      <div className="profile d-flex align-items-center gap-4">
                        <div className="profilPict h-100 d-flex align-items-center gap-2">
                          <div className="line" />
                          {localStorage.getItem("photo") != null ? (
                            <img style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }} src={localStorage.getItem("photo")} alt="profil" />
                          ) : (
                            <img className="w-100 h-100" src={profil} alt="profil" />
                          )}
                        </div>
                        <div className="profileNameLogout d-flex flex-column">
                          <span>
                            <Link className="text-decoration-none" to={"/editProfile"}>
                              {localStorage.getItem("name")}
                            </Link>
                          </span>
                          <span className="fw-bolder text-dark">{myMenu != null && myMenu.length} Recipes</span>
                        </div>
                      </div>
                    </div>
                    <div className="historySectionDetail1 col-3">
                      <span className="text-dark">{new Date().toLocaleDateString("id-ID", options)}</span>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-md-8 colDetailProfil">
                      <div className="toDetailProfile d-flex justify-content-between gap-4">
                        <h3>
                          <Link
                            id="recipes"
                            className={moveRecipe ? "text-dark text-decoration-none" : "text-decoration-none"}
                            onClick={(e) => {
                              setMoveRecipe(true);
                              setMoveBookmark(false);
                              setMoveLike(false);
                            }}
                          >
                            Recipes
                          </Link>
                        </h3>
                        <h3>
                          <Link
                            id="bookmarked"
                            className={moveBookmark ? "text-dark text-decoration-none" : "text-decoration-none"}
                            onClick={(e) => {
                              setMoveBookmark(true);
                              setMoveLike(false);
                              setMoveRecipe(false);
                            }}
                          >
                            Bookmarked
                          </Link>
                        </h3>
                        <h3>
                          <Link
                            id="liked"
                            className={moveLike ? "text-dark text-decoration-none" : "text-decoration-none"}
                            onClick={(e) => {
                              setMoveBookmark(false);
                              setMoveLike(true);
                              setMoveRecipe(false);
                            }}
                          >
                            Liked
                          </Link>
                        </h3>
                      </div>
                      <div className="lineDetailProfile w-100" />
                    </div>
                  </div>
                </div>
              </article>
            </section>
            <section>
              <article>
                <div className="container">
                  {moveBookmark && <MyBookmarked savedRecipe={savedRecipe} />}
                  {moveRecipe && <MyRecipes myMenu={myMenu} getMyRecipe={getMyRecipe} />}
                  {moveLike && <MyLikedRecipe likedRecipe={likedRecipe} />}
                </div>
              </article>
            </section>
          </>
        )}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default DetailProfile;
