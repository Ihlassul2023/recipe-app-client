import { toast } from "react-toastify";
import { instance } from "../../utils/serviceApi";
import { getMenuDetail } from "./menu";
let url = import.meta.env.VITE_BASE_URL;

export const postComment = (data, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "POST_COMMENT_PENDING" });
    console.log(data, id);
    const result = await instance.post(`${url}/comment/${id}`, { text: data });
    toast.success(result.data.msg);
    dispatch(getMenuDetail(id));
    dispatch({ payload: result.data.msg, type: "POST_COMMENT_SUCCESS" });
  } catch (err) {
    console.log("error");
    toast.error(err.response.data.msg);
    dispatch({ payload: err.response.data.msg, type: "POST_COMMENT_FAILED" });
    console.log(err);
  }
};
export const getComment = (data) => async (dispatch, getState) => {
  try {
    dispatch({ type: "GET_COMMENT_PENDING" });
    const result = await instance.get(`${url}/comment/${data}`);
    dispatch({ payload: result.data.data, type: "GET_COMMENT_SUCCESS" });
  } catch (err) {
    console.log("error");
    toast.error(err.response.data.msg);
    dispatch({ payload: err.response.data.msg, type: "GET_COMMENT_FAILED" });
    console.log(err);
  }
};
