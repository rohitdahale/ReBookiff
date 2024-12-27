import './App.css';
import Home from './components/Home/Home';
import { Routes ,Route, BrowserRouter, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import Form from './components/Form/Form';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './components/LandingPage/LandingPage';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
import { useEffect, useState } from 'react';
import Messenger from './components/chat/Messenger';
import Home2 from './components/Home/Home2';
import NoMatch from './components/NoMatch/NoMatch';
import { getUser } from './actions/userActions';
import { useDispatch } from 'react-redux';
import NoSearch from './components/NoMatch/NoSearch';
import MyPostsHome from './components/Home/MyPostsHome';

function App() {
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [currentId,setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(()=>{
      setUser(JSON.parse(localStorage.getItem('profile')));
  },[]);

  return (
    <BrowserRouter> {/*It is the parent component used to store all other components.*/}
      <Container maxWidth='xl'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<LandingPage/>}></Route>
          <Route path='/books' index element={<Home setCurrentId={setCurrentId}/>}></Route>
          <Route path='/books/search' index element={<Home setCurrentId={setCurrentId}/>}></Route>
          <Route path='/books/:id' element={<PostDetails/>}></Route>
          <Route path='/form' element={<Form currentId={currentId} setCurrentId={setCurrentId}/>}></Route>
          <Route path='/auth' element={<Auth/>}></Route>
          <Route path='/chat' element={<Messenger/>}/>
          <Route path='/savedBooks' element={<Home2/>}></Route>
          <Route path='/myBooks' element={<MyPostsHome setCurrentId={setCurrentId}/>}></Route>
          <Route path='/books/search/booknotfound' element={<NoSearch/>}></Route>
          <Route path='*' element = {<NoMatch/>} ></Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
