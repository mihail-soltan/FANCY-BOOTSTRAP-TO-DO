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
function App() {
  const [showWelcome, setShowWelcome] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("username")
    console.log(name)
    // if (!name) {
    //   setShowWelcome(true)
    // }
    const token = localStorage.getItem("token")
    const rememberMe = localStorage.getItem("rememberMe")
    if(token && rememberMe){
      navigate("/tasks/all")
      return
    }
    navigate("signup")
  }, [])
  //categories
  return (
    <div className="App">
      <Navigation setShow={setShowWelcome} />
      <WelcomeModal show={showWelcome} setShow={setShowWelcome} />
      <Routes>
        <Route path="/tasks/:category" element={<ToDoList />} />
        <Route path="categories" element={<Category />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
