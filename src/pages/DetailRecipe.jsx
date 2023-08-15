import React, { Component } from "react";
import { Navbar, Footer } from "../components";
import profil from "../assets/images/profil.png";
import save from "../assets/images/save.png";
import like from "../assets/images/like.png";
import axios from "axios";

class DetailRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: null,
    };
  }
  componentDidMount() {
    const id = window.location.href.split("/")[4];
    let url = import.meta.env.VITE_BASE_URL;
    axios
      .get(`${url}/recipe/${id}`)
      .then((data) => {
        this.setState({
          menu: data.data.data,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { menu } = this.state;
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
                        <img className="w-100 h-100" src={profil} alt="profil" />
                      </div>
                      <div className="profileNameLogout d-flex flex-column">
                        <span>Ayudia</span>
                        <span className="fw-bolder text-dark">10 Recipes</span>
                      </div>
                    </div>
                  </div>
                  <div className="historySectionDetail1 col-3">
                    <span className="text-dark">21 February 2023</span>
                    <br />
                    <span className="text-dark">20 Likes - 2 Comments</span>
                  </div>
                </div>
              </div>
            </article>
          </section>
          <section className="mb-5">
            <article>
              <div className="container">
                <div key={menu?.id} className="row justify-content-center">
                  <div className="col-12 d-flex flex-column align-items-center gap-3">
                    <h1 className="text-dark">{menu?.title}</h1>
                    <img className="pictSectionDetail2 w-50 h-50" src={menu?.photo} alt="gambar" />
                    <div className="ingredients mt-3 w-100">
                      <h3 className="text-dark">Ingredients</h3>
                      <ul>
                        {menu?.ingredients.split(",").map((item) => (
                          <li className="text-dark">{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="action d-flex align-items-center w-100 gap-3">
                      <img src={save} height="30px" width="30px" alt="gambar" />
                      <img src={like} height="30px" width="30px" alt="gambar" />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </section>
          <section className="mb-5">
            <article>
              <div className="container">
                <div className="row mb-4">
                  <div className="lineUp mb-3" />
                  <div className="sectionDetailRecipe3 col-8 d-flex align-items-center justify-content-start">
                    <div className="profile d-flex align-items-center gap-4">
                      <div className="profilPict h-100 d-flex align-items-center gap-2">
                        <img className="imgDetailRecipe3 w-100 h-100" src={profil} alt="profil" />
                      </div>
                      <div className="profileNameLogout d-flex flex-column">
                        <span>Karen</span>
                        <span className="fw-bolder text-dark">20 Recipes</span>
                      </div>
                      <div className="line" />
                      <span className="text-dark"> Wow, I just made this and it was delicious! Thanks for sharing!</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="sectionDetailRecipe3 col-8 d-flex align-items-center justify-content-start">
                    <div className="profile d-flex align-items-center gap-4">
                      <div className="profilPict h-100 d-flex align-items-center gap-2">
                        <img className="imgDetailRecipe3 w-100 h-100" src={profil} alt="profil" />
                      </div>
                      <div className="profileNameLogout d-flex flex-column">
                        <span>Ariel</span>
                        <span className="fw-bolder text-dark">20 Recipes</span>
                      </div>
                      <div className="line" />
                      <span className="text-dark">So simple and delicious!</span>
                    </div>
                  </div>
                  <div className="lineUp mt-3" />
                </div>
              </div>
            </article>
          </section>
          <section>
            <article>
              <div className="container">
                <div className="row">
                  <div className="col-8 sectioDetailRecipe4 d-flex flex-column gap-3">
                    <input className="inputComment" placeholder="Your comment here!" type="text" />
                    <button className="btnComment">Send a comment</button>
                  </div>
                </div>
              </div>
            </article>
          </section>
        </main>
        <footer>
          <Footer />
        </footer>
      </>
    );
  }
}

export default DetailRecipe;
