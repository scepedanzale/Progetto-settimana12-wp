import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import PostsPage from './pages/PostsPage';
import NavbarComponent from './components/NavbarComponent';
import PostDetailPage from './pages/PostDetailPage';
import UsersPage from './pages/UsersPage';
import UserPostsPage from './pages/UserPostsPage';
import CategoriesPage from './pages/CategoriesPage';
import PostsCategoryPage from './pages/PostsCategoryPage';

function App() {
  return (
    <BrowserRouter>
      <NavbarComponent/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/posts" element={<PostsPage/>}/>
        <Route path="/posts/:id" element={<PostDetailPage/>}/>
        <Route path="/posts/author/:id/:name" element={<UserPostsPage/>}/>
        <Route path="/users" element={<UsersPage/>}/>
        <Route path="/categories" element={<CategoriesPage/>}/>
        <Route path="/posts/category/:id/:name" element={<PostsCategoryPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
