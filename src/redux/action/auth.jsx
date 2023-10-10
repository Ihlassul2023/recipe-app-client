import axios from "axios";
import { toast } from "react-toastify";
import { instance } from "../../utils/serviceApi";
let url = import.meta.env.VITE_BASE_URL;

export const register = (data) => async (dispatch) => {
  try {
    dispatch({ type: "AUTH_REGISTER_PENDING" });
    const result = await axios.post(url + `/auth/register`, data);
    console.log(result);
    dispatch({ payload: result.data.msg, type: "AUTH_REGISTER_SUCCESS" });
  } catch (err) {
    console.log("error");
    dispatch({ payload: err.response.data.msg, type: "AUTH_REGISTER_FAILED" });
    console.log(err.response.data.msg);
  }
};
export const login = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "AUTH_LOGIN_PENDING" });
    const result = await axios.post(url + `/auth/login`, data);
    localStorage.setItem("token", result.data.token);
    localStorage.setItem("name", result.data.user.name);
    localStorage.setItem("photo", result.data.user.photo_user);
    localStorage.setItem("email", result.data.user.email);
    localStorage.setItem("id_user", result.data.user.id);
    toast.success(result.data.msg);
    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 1000);
    dispatch({ payload: result.data.user, type: "AUTH_LOGIN_SUCCESS" });
  } catch (err) {
    console.log("error");
    toast.error(err.response.data.msg);
    dispatch({ payload: err.response.data.msg, type: "AUTH_LOGIN_FAILED" });
    console.log(err);
  }
};
export const updateUser = (data) => async (dispatch) => {
  try {
    dispatch({ type: "AUTH_UPDATE_PENDING" });
    const result = await instance.put(url + `/auth/updateUser`, data);
    localStorage.setItem("photo", result.data.data.photo_user);
    localStorage.setItem("name", result.data.data.name);
    localStorage.setItem("email", result.data.data.email);
    toast.success(result.data.msg);
    dispatch({ payload: result.data.msg, type: "AUTH_UPDATE_SUCCESS" });
  } catch (err) {
    console.log("error");
    toast.error(err.response.data.msg);
    dispatch({ payload: err.response.data.msg, type: "AUTH_UPDATE_FAILED" });
    console.log(err);
  }
};
