import React, { useEffect, useState } from "react";
import karen from "../assets/images/karen.png";
import { Navbar, Footer } from "../components";
import loading from "../assets/images/loading.png";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { getMenu } from "../redux/action/menu";
import { useDispatch, useSelector } from "react-redux";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const SearchMenu = () => {
  const [search, setSearch] = useState("");
  const [runSearch, setRunSearch] = useState(false);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams({});
  const query = useQuery();
  const [sort, setSort] = useState("ASC");
  const { data, isLoading, errorMessage, isError } = useSelector((state) => state.menuReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllData();
    setRunSearch(false);
  }, [page, runSearch, sort]);
  const getAllData = () => {
    dispatch(getMenu(query.get("search"), query.get("page"), sort));
  };
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main>
        <section className="distanceNav mb-5">
          <article>
            <div className="container">
              <div className="row">
                <div className="col-8 sectionSearchMenu1 d-flex flex-column gap-4">
                  <h1 className="w-50">Discover Recipe &amp; Delicious Food</h1>
                  <div className="inputSearch d-flex justify-content-between">
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setSearchParams({ search: e.target.value, page });
                      }}
                    />
                    <button
                      onClick={() => {
                        setRunSearch(true);
                        setPage(1);
                        setSearchParams({ search, page: 1 });
                      }}
                    >
                      Search
                    </button>
                  </div>
                  <div className="category d-flex flex-wrap justify-content-between">
                    <button onClick={() => setSort("DESC")}>New</button>
                    <button>Popular</button>
                    <button>Vegetarian</button>
                    <button>Breakfast</button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </section>
        <section>
          <article className="mainMenu">
            {isLoading ? (
              <div className="loading-container">
                <img className="loading-image" src={loading} alt="Image 1" />
              </div>
            ) : (
              <div className="container">
                {isError ? (
                  <p>{errorMessage}</p>
                ) : (
                  data?.data.map((menu) => (
                    <div key={menu.id} className="listRecipe row mb-4">
                      <div className="listRecipeImage col-md-4">
                        <img style={{ height: "300px", width: "350px", objectFit: "cover" }} loading="lazy" src={menu.photo} alt="gambar" />
                      </div>
                      <div className="listRecipeExp col-md-3 d-flex flex-column gap-2">
                        <h3 className="text-dark">{menu.title}</h3>
                        <ul>
                          {menu.ingredients.split(",").map((item) => (
                            <li className="text-dark">{item}</li>
                          ))}
                        </ul>
                        <button className="buttonSection2">
                          <Link to={`/detailRecipe/${menu.id}`}>
                            {menu.like_count} Likes - {menu.comment_count} Comment - {menu.saved_count} Bookmark
                          </Link>
                        </button>
                        <div className="profile d-flex align-items-center gap-2">
                          {menu.profil_pict ? (
                            <img style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }} src={menu.profil_pict} alt="gambar" />
                          ) : (
                            <img style={{ width: "50px", height: "50px", objectFit: "cover" }} src={karen} alt="gambar" />
                          )}
                          <span className="text-dark">{menu.author}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
                <div className="row justify-content-center">
                  <div className="pagination w-100 col-4 d-flex justify-content-center align-items-center gap-4">
                    <button
                      onClick={() => {
                        if (page - 1 != 0) {
                          setPage((page) => page - 1);
                          setSearchParams({ search, page: page - 1 });
                        }
                      }}
                      className="buttonSection2"
                    >
                      Prev
                    </button>
                    <span>
                      Show {data?.pagination.pageNow}-{data?.pagination.totalPage} from {data?.pagination.totalData}
                    </span>
                    <button
                      onClick={() => {
                        setPage((page) => page + 1);
                        setSearchParams({ search, page: page + 1 });
                      }}
                      className="buttonSection2"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </article>
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default SearchMenu;
