import NavBar from './components/NavBar/NavBar';
import Main from './components/main/Main';
import Chat from './components/Chat/Chat';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Ingredientes from './components/Ingredientes/Ingredientes';
import Register from './components/Register/Register';
import { UserProvider } from "./context/UserProvider";

function App() {
  return (
    <>
    <UserProvider>
      <BrowserRouter>
      <NavBar></NavBar>
        <Routes>
        <Route path='/' element={<Main />} />
        <Route path="/chat"   element={<Chat/>}    />
        <Route path='/register' element={<Register/>}/>
        <Route path="/ingredientes"   element={<Ingredientes/>}    />
        </Routes>

      </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
