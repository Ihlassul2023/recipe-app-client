import React from "react";
import sectionSearchMenu from "../assets/images/section-searchMenu.png";

const MyBookmarked = () => {
  return (
    <div className="listRecipe row mb-4">
      <div className="listRecipeImage col-4">
        <img className="h-100 w-100" src={sectionSearchMenu} alt="gambar" />
      </div>
      <div className="listRecipeExp col-4 d-flex flex-column gap-4">
        <h3 className="text-dark">Bomb Chicken</h3>
        <p className="w-50">Ingredients: chicken, dumpling wrap, garlic, spring onion, soy sauce, black sesame seed</p>
        <button className="buttonSection2">
          <a href="./detailRecipe.html">10 Likes - 12 Comment - 3 Bookmark</a>
        </button>
        <div className="profile btnDetailProfile d-flex flex-column-reverse align-items-start gap-5">
          <div />
          <button className="w-75">Delete From Bookmark</button>
        </div>
      </div>
    </div>
  );
};

export default MyBookmarked;
