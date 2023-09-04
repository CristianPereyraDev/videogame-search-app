import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import GameForm from '../components/GameForm/GameForm';
import Landing from '../pages/Landing/Landing';
import Detail from '../pages/Detail/Detail';
import Home from '../pages/Home/Home';

function App() {
  const location = useLocation();
  return (
    <div className='App'>
      {location.pathname !== '/' ? (
        <div className='navbarContainer'>
          <NavBar />
        </div>
      ) : null}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />}></Route>
        <Route path='/detail/:gameId' element={<Detail />} />
        <Route path='/add' element={<GameForm />} />
      </Routes>
    </div>
  );
}

export default App;
