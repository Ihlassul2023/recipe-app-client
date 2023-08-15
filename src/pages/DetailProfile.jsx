import React, { useEffect, useState } from "react";
import { Navbar, Footer, MyRecipes, MyBookmarked } from "../components";
import profil from "../assets/images/profil.png";
import { Link } from "react-router-dom";
import loading from "../assets/images/loading.png";
import { instance } from "../utils/serviceApi";
import { useDispatch, useSelector } from "react-redux";
import { getMyMenu } from "../redux/action/menu";

const DetailProfile = () => {
  const [move, setMove] = useState(false);
  const [myMenu, setMyMenu] = useState(null);
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.myMenu_Reducer);
  useEffect(() => {
    getMyRecipe();
    document.getElementById(`recipes`).classList.add("text-dark");
  }, []);
  useEffect(() => {
    !isLoading && setMyMenu(data);
  }, [isLoading]);
  const handleMove = (boolean) => {
    setMove(boolean);
    if (boolean) {
      document.getElementById(`bookmarked`).classList.add("text-dark");
      document.getElementById(`recipes`).classList.remove("text-dark");
    } else {
      document.getElementById(`bookmarked`).classList.remove("text-dark");
      document.getElementById(`recipes`).classList.add("text-dark");
    }
  };
  const getMyRecipe = async () => {
    dispatch(getMyMenu());
  };
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
                      <span className="text-dark">21 February 2023</span>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-md-8 colDetailProfil">
                      <div className="toDetailProfile d-flex justify-content-between gap-4">
                        <h3>
                          <Link id="recipes" className="text-decoration-none" onClick={(e) => handleMove(false)}>
                            Recipes
                          </Link>
                        </h3>
                        <h3>
                          <Link id="bookmarked" className="text-decoration-none" onClick={(e) => handleMove(true)}>
                            Bookmarked
                          </Link>
                        </h3>
                        <h3>
                          <a className="text-decoration-none" href="./detailProfile.html">
                            Liked
                          </a>
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
                <div className="container">{move ? <MyBookmarked /> : <MyRecipes myMenu={myMenu} getMyRecipe={getMyRecipe} />}</div>
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
