import React from "react";
import sectionPertama from "../assets/images/section-pertama.webp";
import sectionKedua from "../assets/images/section-kedua.webp";
import sectionKetiga from "../assets/images/section-ketiga.webp";
import sectionKeempat1 from "../assets/images/section-keempat1.webp";
import sectionKeempat2 from "../assets/images/section-keempat2.webp";
import sectionKeempat3 from "../assets/images/section-keempat3.webp";
import sectionKeempat4 from "../assets/images/section-keempat4.webp";
import sectionKeempat5 from "../assets/images/section-keempat5.webp";
import sectionKeempat6 from "../assets/images/section-keempat6.webp";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Home = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  };
  return (
    <>
      <nav>
        <div className="container-fluid position-relative">
          <div className="row justify-content-between">
            <div className="col-4 navigation d-flex justify-content-between align-items-center">
              <label htmlFor="checkBox" className="d-none close">
                <span className="material-symbols-outlined">close </span>
              </label>
              {token ? (
                <>
                  <Link onClick={handleLogout}>Logout</Link>
                  <Link to={"/addRecipe"}>Add Menu</Link>
                </>
              ) : (
                <>
                  <Link to={"/login"}>Login</Link>
                  <Link to={"/register"}>Register</Link>
                </>
              )}
              <Link to={"/searchMenu?search&page"}>Search Menu</Link>
            </div>
            <div className="col-4 menuBurger d-none">
              <label htmlFor="checkBox">
                <span className="material-symbols-outlined"> menu </span>
              </label>
              <input className="toggle-navbar d-none" type="checkbox" id="checkBox" name="checkBox" />
            </div>
            <div className="bar_yellow position-absolute bg-warning" />
          </div>
        </div>
      </nav>
      <main>
        <section className="mb-5">
          <article>
            <div className="container">
              <div className="section1 row justify-content-between">
                <div className="col-md-5 align-self-center menuSearch mb-4">
                  <h1>Discover Recipe &amp; Delicious Food</h1>
                  <input type="text" placeholder="search restaurant, food" />
                </div>
                <div className="col-md-5 img">
                  <img className="h-100 w-100" src={sectionPertama} alt="gambar" />
                </div>
              </div>
            </div>
          </article>
        </section>
        <section className="mb-5">
          <article>
            <div className="container">
              <div className="titleSection d-flex align-items-center">
                <div className="bar h-100 bg-warning" />
                <h2>Popular For You !</h2>
              </div>
              <div className="section row justify-content-between">
                <div className="col-md-5 mb-4 position-relative img">
                  <img className="h-100 w-100" src={sectionKedua} alt="gambar" />
                  <div className="frame h-100 w-75 position-absolute" />
                </div>
                <div className="col-md-5 align-self-center">
                  <h2>Healthy Bone Broth Ramen (Quick &amp; Easy)</h2>
                  <p>Quick + Easy Chicken Bone Broth Ramen- Healthy chicken ramen in a hurry? That’s right!</p>
                  <button>Learn More</button>
                </div>
              </div>
            </div>
          </article>
        </section>
        <section className="mb-5">
          <article>
            <div className="container">
              <div className="titleSection d-flex align-items-center">
                <div className="bar h-100 bg-warning" />
                <h2>New Recipe</h2>
              </div>
              <div className="section row justify-content-between">
                <div className="col-md-5 mb-4 img position-relative img">
                  <img className="h-100 w-100" src={sectionKetiga} alt="gambar" />
                  <div className="barSection h-100 w-75 position-absolute" />
                </div>
                <div className="col-md-5 align-self-center">
                  <h2>Healthy Bone Broth Ramen (Quick &amp; Easy)</h2>
                  <p>Quick + Easy Chicken Bone Broth Ramen- Healthy chicken ramen in a hurry? That’s right!</p>
                  <button>Learn More</button>
                </div>
              </div>
            </div>
          </article>
        </section>
        <section className="mb-5">
          <article>
            <div className="container">
              <div className="titleSection d-flex align-items-center">
                <div className="bar h-100 bg-warning" />
                <h2>Popular Recipes</h2>
              </div>
              <div className="section row justify-content-between">
                <div className="col-md-4 mb-4 position-relative">
                  <img className="h-100 w-100" src={sectionKeempat1} alt="section1" />
                  <h4 className="position-absolute captImg">Chicken Kare</h4>
                </div>
                <div className="col-md-4 mb-4 position-relative">
                  <img className="h-100 w-100" src={sectionKeempat2} alt="section2" />
                  <h4 className="position-absolute captImg">Bomb Chicken</h4>
                </div>
                <div className="col-md-4 mb-4 position-relative">
                  <img className="h-100 w-100" src={sectionKeempat3} alt="section3" />
                  <h4 className="position-absolute captImg">Banana Smothie Pop</h4>
                </div>
              </div>
              <div className="section row justify-content-between">
                <div className="col-md-4 mb-4 position-relative">
                  <img className="h-100 w-100" src={sectionKeempat4} alt="section4" />
                  <h4 className="position-absolute captImg">Coffe Lava Cake</h4>
                </div>
                <div className="col-md-4 mb-4 position-relative">
                  <img className="h-100 w-100" src={sectionKeempat5} alt="section5" />
                  <h4 className="position-absolute captImg">Sugar Salmon</h4>
                </div>
                <div className="col-md-4 mb-4 position-relative">
                  <img className="h-100 w-100" src={sectionKeempat6} alt="section6" />
                  <h4 className="position-absolute captImg">Indian Salad</h4>
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
};

export default Home;
