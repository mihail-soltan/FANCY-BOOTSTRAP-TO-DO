import './App.css';
import { ToDoList } from './components/ToDoList/ToDoList';
import { WelcomeModal } from './components/WelcomeModal/WelcomeModal';
import { Navigation } from './components/Navbar/Navigation';
import {useState, useEffect} from 'react'
function App() {
  const [showWelcome, setShowWelcome] = useState(false)
  useEffect(()=>{
    const name = localStorage.getItem("username")
    console.log(name)
    if(!name){
      setShowWelcome(true)
    }
},[])
  return (
    <div className="App">
      {/* <StylingExample /> */}
      <Navigation setShow={setShowWelcome} />
      <WelcomeModal show={showWelcome} setShow={setShowWelcome}/>
      <ToDoList />
    </div>
  );
}

export default App;
