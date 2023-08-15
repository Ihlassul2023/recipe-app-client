import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/main.css";
import { Home, SearchMenu, AddRecipe, DetailProfile, DetailRecipe, Login, Register, Verification, UpdateProfile } from "./pages";
import AuthChecker from "./components/AuthChecker";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/searchMenu" element={<SearchMenu />} />
          <Route
            path="/addRecipe/:id"
            element={
              <AuthChecker>
                <AddRecipe />
              </AuthChecker>
            }
          />
          <Route
            path="/addRecipe"
            element={
              <AuthChecker>
                <AddRecipe />
              </AuthChecker>
            }
          />
          <Route
            path="/detailProfile"
            element={
              <AuthChecker>
                <DetailProfile />
              </AuthChecker>
            }
          />
          <Route
            path="/editProfile"
            element={
              <AuthChecker>
                <UpdateProfile />
              </AuthChecker>
            }
          />
          <Route path="/detailRecipe/:id" element={<DetailRecipe />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verification" element={<Verification />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
