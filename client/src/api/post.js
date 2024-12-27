import axios from 'axios';

const API = axios.create({baseURL:"http://localhost:5000/api"})

API.interceptors.request.use((req)=>{
  if(localStorage.getItem('profile')){
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
}
);

export const getposts = () => API.get('/posts');
export const createPost = (post)=> API.post('/posts',post);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const fetchPost = (id) => API.get(`/posts/${id}`)
export const updatePost = (id,updatedPost) => API.patch(`/posts/${id}`,updatedPost);

export const fetchConversations = (userId) => API.get(`/conversations/${userId}`);

export const getUser = (userId) => API.get(`/user/${userId}`);

export const fetchMessages = (conversationId) => API.get(`/messages/${conversationId}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?year=${searchQuery.year}&branch=${searchQuery.branch}&semester=${searchQuery.semester}`)

export const sendMessage = (message) => API.post(`/messages`,message);

export const addConversation = (senderId,receiverId) => API.post(`/conversations`,{senderId,receiverId});


export const signUp = (authData) => API.post('/auth/signup',authData);
export const logIn = (authData) => API.post('/auth/login',authData);
export const savePost = (postId) => API.post(`/user/savepost/${postId}`);
export const getSavedPosts = () => API.get('/user/getsavedposts');