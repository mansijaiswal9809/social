import axios from "axios";
// const url = "http://localhost:5000/posts";
const API = axios.create({ baseURL: "https://friendsbook-api.onrender.com" });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(`/posts/search?searchQuery=${searchQuery.search}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likepost`);
export const signin = (formData) => API.post("/user/signin", formData);
export const signup = (formData) => API.post("/user/signup ", formData);
export const comment = ({name,comment,id,userId}) => API.patch(`/posts/${id}/commentPost`, {name,comment,userId});
export const deleteComment=(id,userId)=>API.patch(`/posts/${id}/deletecomment`,{userId})
