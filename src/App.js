import NavBar from './components/NavBar/NavBar';
import Main from './components/main/Main';
import Chat from './components/Chat/Chat';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Ingredientes from './components/Ingredientes/Ingredientes';

function App() {
  return (
    <>
      <BrowserRouter>
      <NavBar></NavBar>
        <Routes>
        <Route path='/' element={<Main />} />
        <Route path="/chat"   element={<Chat/>}    />
        <Route path="/ingredientes"   element={<Ingredientes/>}    />
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
