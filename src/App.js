import './App.css';
import { ToDoList } from './components/ToDoList/ToDoList';
import { WelcomeModal } from './components/WelcomeModal/WelcomeModal';
import { Navigation } from './components/Navbar/Navigation';
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import { Category } from './components/Category/Category';
import { useNavigate } from 'react-router-dom';
import { SignUp } from './components/SignUp/SignUp';
import { SignIn } from './components/SignIn/SignIn';
import { useLocation } from 'react-router-dom';

function App() {
  // isGuest
  const [showWelcome, setShowWelcome] = useState(false)
  const [isAuthRoute, setIsAuthRoute] = useState(false)
  const [isGuest, setIsGuest] = useState(false)

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const name = localStorage.getItem("username")
    console.log(name)
    // if (!name) {
    //   setShowWelcome(true)
    // }
    const token = localStorage.getItem("token")
    const rememberMe = localStorage.getItem("rememberMe")
    const isGuest = localStorage.getItem("isGuest")

    if ((token && rememberMe) || isGuest) {
      navigate("/tasks/all")
      return
    }

    navigate("signup")
  }, [])

  // ||
  useEffect(() => {
    console.log(isAuthRoute)
    if (location.pathname.includes("signup")
      || location.pathname.includes("signin")) {
      setIsAuthRoute(true)
    }
    else {
      setIsAuthRoute(false)
    }
  }, [location])

  return (
    <div className="App">

      {!isAuthRoute && <Navigation setShow={setShowWelcome} />}
      <WelcomeModal show={showWelcome} setShow={setShowWelcome} />
      <Routes>
        <Route path="/tasks/:category" element={<ToDoList />} />
        <Route path="categories" element={<Category />} />
        <Route path="signup" element={<SignUp setIsGuest={setIsGuest} />} />
        <Route path="signin" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
