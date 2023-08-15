import { combineReducers } from "redux";
import register from "./auth/register";
import login from "./auth/login";
import menuReducer from "./menu/menu";
import post_menuReducer from "./menu/post_menu";
import delete_menuReducer from "./menu/delete_menu";
import detail_menuReducer from "./menu/detail_menu";
import put_menuReducer from "./menu/put_menu";
import myMenu_Reducer from "./menu/myMenu_reducer";
import updateUser from "./auth/updateProfile";
const rootReducers = combineReducers({
  register,
  login,
  menuReducer,
  delete_menuReducer,
  post_menuReducer,
  put_menuReducer,
  detail_menuReducer,
  myMenu_Reducer,
  updateUser,
});

export default rootReducers;
