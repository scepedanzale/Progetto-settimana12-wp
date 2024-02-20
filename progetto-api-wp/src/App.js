import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import PostsPage from './pages/PostsPage';
import NavbarComponent from './components/NavbarComponent';
import PostDetailPage from './pages/PostDetailPage';
import UsersPage from './pages/UsersPage';

function App() {
  return (
    <BrowserRouter>
      <NavbarComponent/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/posts" element={<PostsPage/>}/>
        <Route path="/posts/:id" element={<PostDetailPage/>}/>
        <Route path="/users" element={<UsersPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;