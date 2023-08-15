import { instance } from "../../utils/serviceApi";
import { toast } from "react-toastify";
import axios from "axios";
let url = import.meta.env.VITE_BASE_URL;

export const getMenu = (search, page, sort) => async (dispatch) => {
  try {
    dispatch({ type: "GET_MENU_PENDING" });
    const result = await axios.get(`${url}/recipe?searchBy=title&search=${search}&page=${page}&sort=${sort}&limit=2`);
    dispatch({ payload: result.data, type: "GET_MENU_SUCCESS" });
  } catch (err) {
    console.log("error");
    dispatch({ payload: err.response.data.msg, type: "GET_MENU_FAILED" });
    console.log(err);
  }
};

export const getMenuDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DETAIL_MENU_PENDING" });
    const result = await axios.get(`${url}/recipe/${id}`);
    dispatch({ payload: result.data.data, type: "DETAIL_MENU_SUCCESS" });
  } catch (err) {
    console.log("error");
    dispatch({ payload: err.response.data.msg, type: "DETAIL_MENU_FAILED" });
    console.log(err);
  }
};

export const postMenu = (data) => async (dispatch) => {
  try {
    dispatch({ type: "POST_MENU_PENDING" });
    const result = await instance.post(`${url}/recipe`, data);
    toast.success(result.data.msg);
    dispatch({ payload: result.data.msg, type: "POST_MENU_SUCCESS" });
  } catch (err) {
    console.log("error");
    toast.error(err.response.data.msg);
    dispatch({ payload: err.response.data.msg, type: "POST_MENU_FAILED" });
    console.log(err);
  }
};

export const updateMenu = (data, id) => async (dispatch) => {
  try {
    dispatch({ type: "PUT_MENU_PENDING" });
    const result = await instance.put(`${url}/recipe/${id}`, data);
    toast.success(result.data.msg);
    dispatch({ payload: result.data.msg, type: "PUT_MENU_SUCCESS" });
  } catch (err) {
    console.log("error");
    toast.error(err.response.data.msg);
    dispatch({ payload: err.response.data.msg, type: "PUT_MENU_FAILED" });
    console.log(err);
  }
};

export const deleteMenu = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_MENU_PENDING" });
    const result = await instance.delete(`${url}/recipe/${id}`);
    toast.error(result.data.msg);
    setTimeout(() => {
      dispatch(getMyMenu());
    }, 1000);
    dispatch({ payload: result.data.msg, type: "DELETE_MENU_SUCCESS" });
  } catch (err) {
    console.log("error");
    toast.error(err.response.data.msg);
    dispatch({ payload: err.response.data.msg, type: "DELETE_MENU_FAILED" });
    console.log(err);
  }
};
export const getMyMenu = () => async (dispatch) => {
  try {
    dispatch({ type: "GETMY_MENU_PENDING" });
    const result = await instance.get(`${url}/recipe/myRecipe`);
    dispatch({ payload: result.data.data, type: "GETMY_MENU_SUCCESS" });
  } catch (err) {
    console.log("error");
    dispatch({ payload: err.response.data.msg, type: "GETMY_MENU_FAILED" });
    console.log(err);
  }
};
