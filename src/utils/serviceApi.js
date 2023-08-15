import axios from "axios";
let url = import.meta.env.VITE_BASE_URL;
const instance = axios.create({
  baseURL: `${url}`,
  headers: { Authorization: "Bearer " + localStorage.getItem("token") },
});

export { instance };
