import "./App.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import GameForm from "./components/GameForm/GameForm";
import Detail from "./components/Detail/Detail";
import Home from "./components/Home/Home";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== "/" ? (
        <div className="navbarContainer">
          <NavBar />
        </div>
      ) : null}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:gameId" element={<Detail />} />
        <Route path="/add" element={<GameForm />} />
      </Routes>
    </div>
  );
}

export default App;
